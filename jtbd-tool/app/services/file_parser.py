import io
import csv
from pathlib import Path


def parse_file(filename: str, content: bytes) -> str:
    """Extract plain text from uploaded file bytes based on extension."""
    ext = Path(filename).suffix.lower()

    if ext == ".txt":
        return content.decode("utf-8", errors="replace")

    if ext == ".docx":
        return _parse_docx(content)

    if ext == ".pdf":
        return _parse_pdf(content)

    if ext == ".csv":
        return _parse_csv(content)

    # Fallback: attempt UTF-8 decode
    return content.decode("utf-8", errors="replace")


def _parse_docx(content: bytes) -> str:
    from docx import Document
    doc = Document(io.BytesIO(content))
    return "\n".join(para.text for para in doc.paragraphs if para.text.strip())


def _parse_pdf(content: bytes) -> str:
    import PyPDF2
    reader = PyPDF2.PdfReader(io.BytesIO(content))
    parts = []
    for page in reader.pages:
        text = page.extract_text()
        if text:
            parts.append(text)
    return "\n".join(parts)


def _parse_csv(content: bytes) -> str:
    text = content.decode("utf-8", errors="replace")
    reader = csv.reader(io.StringIO(text))
    rows = [", ".join(row) for row in reader]
    return "\n".join(rows)
