import { toPng } from "html-to-image";
import jsPDF from "jspdf";


async function appendPage2PDF(pdf: jsPDF, pageElement: HTMLDivElement, pageNb: number) {
    // Convert HTML to PDF
    const dataUrl = await toPng(pageElement);

    // Add the PNG on a PDF page
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; // Maintain aspect ratio

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
}

export async function cards2pdf() {
    const pdf = new jsPDF();

    // Append all pages to the PDF
    let pageNb = 0;
    const pages2print = document.getElementsByClassName("page2print");
    for (const pageElement of pages2print) {
        if (pageNb > 0) {
            pdf.addPage();
        }
        await appendPage2PDF(pdf, pageElement as HTMLDivElement, pageNb);
        pageNb++;
    }

    // Generate and download the PDF file
    const pdfBlob = pdf.output("blob");
    const pdfLink = document.createElement("a");
    pdfLink.href = URL.createObjectURL(pdfBlob);
    pdfLink.download = "cards.pdf";
    pdfLink.click();
}