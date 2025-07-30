import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateCertificatePDF = (request) => {
  const fileName = `${Date.now()}-certificado-${request.id}.pdf`;
  const filePath = path.join("uploads", fileName);

  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("Certificado Oficial", { align: "center" });
  doc.moveDown();

  doc.fontSize(14).text(`Este certificado se emite a:`);
  doc.moveDown();

  doc.text(`Nombre: ${request.full_name}`);
  doc.text(`Cédula: ${request.document_type}`);
  doc.text(`Fecha de Nacimiento: ${new Date(request.birth_date).toLocaleDateString()}`);
  doc.text(`Género: ${request.gender}`);
  doc.moveDown();

  doc.text(`Motivo de la solicitud: ${request.reason}`);
  doc.moveDown(2);

  doc.text("Firmado electrónicamente por DocuTrack");

  doc.end();

  return fileName;
};
