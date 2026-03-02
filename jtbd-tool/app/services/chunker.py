from typing import List

# Conservative token estimate: 1 token ≈ 4 characters
# Leave room for system prompt + JSON schema overhead
MAX_CHUNK_CHARS = 60_000  # ~15k tokens


def chunk_text(text: str, max_chars: int = MAX_CHUNK_CHARS) -> List[str]:
    """Split text into chunks that fit within the context window.

    Splits on paragraph boundaries where possible to avoid cutting
    mid-sentence. If a single paragraph exceeds max_chars it is
    split on sentence boundaries.
    """
    if len(text) <= max_chars:
        return [text]

    paragraphs = text.split("\n\n")
    chunks: List[str] = []
    current: List[str] = []
    current_len = 0

    for para in paragraphs:
        para_len = len(para) + 2  # account for the \n\n separator

        if para_len > max_chars:
            # Flush current buffer first
            if current:
                chunks.append("\n\n".join(current))
                current = []
                current_len = 0
            # Split oversized paragraph on sentence boundaries
            chunks.extend(_split_on_sentences(para, max_chars))
            continue

        if current_len + para_len > max_chars:
            chunks.append("\n\n".join(current))
            current = [para]
            current_len = para_len
        else:
            current.append(para)
            current_len += para_len

    if current:
        chunks.append("\n\n".join(current))

    return chunks


def _split_on_sentences(text: str, max_chars: int) -> List[str]:
    sentences = text.replace(". ", ".\n").split("\n")
    chunks: List[str] = []
    current: List[str] = []
    current_len = 0

    for sentence in sentences:
        s_len = len(sentence) + 1
        if current_len + s_len > max_chars:
            if current:
                chunks.append(" ".join(current))
            current = [sentence]
            current_len = s_len
        else:
            current.append(sentence)
            current_len += s_len

    if current:
        chunks.append(" ".join(current))

    return chunks
