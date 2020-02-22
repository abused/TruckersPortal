import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

async function makeInvoicePDF(invoiceNumber, component) {
    let pdf = new jsPDF();
    let canvas = await html2canvas(component);

    let imageData = canvas.toDataURL('image/png', {scale: 1});
    let imageProps = pdf.getImageProperties(imageData);
    let pdfWidth = pdf.internal.pageSize.getWidth() * 0.92;
    let pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;

    pdf.addImage(imageData, 'PNG', pdf.internal.pageSize.getWidth() * 0.04, 10, pdfWidth, pdfHeight);
    pdf.save('invoice-' + invoiceNumber + '.pdf');
}

export {makeInvoicePDF};