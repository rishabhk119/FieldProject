const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Service to generate 80G compliant donation receipts
 */
class ReceiptService {
  /**
   * Create a PDF receipt for a specific donation
   * @param {Object} donation - Donation document
   * @param {Object} user - User document
   */
  static generate80GReceipt(donation, user, res) {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=SaiTapovan_Receipt_${donation.orderId}.pdf`);

    doc.pipe(res);

    // --- Header ---
    doc.fontSize(24).font('Helvetica-Bold').fillColor('#f97316').text('SAI TAPOVAN ASHRAM', { align: 'center' });
    doc.fontSize(10).font('Helvetica').fillColor('#555').text('Ubhari Foundation · Registered NGO · 12A/80G Compliant', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(9).text('Reg Address: Plot 42, Spiritual Valley, Maharashtra, India', { align: 'center' });
    doc.text('PAN: AAATU0000X | Registration No: 2026/UB/80G171', { align: 'center' });

    doc.moveDown(2);
    doc.lineWidth(1).strokeColor('#eee').moveTo(50, doc.y).lineTo(545, doc.y).stroke();
    doc.moveDown(2);

    // --- Receipt Title ---
    doc.fontSize(20).font('Helvetica-Bold').fillColor('#333').text('Donation Receipt / 80G Certificate', { align: 'center' });
    doc.moveDown(2);

    // --- Content Body ---
    const startY = doc.y;
    doc.fontSize(12).font('Helvetica-Bold').text('Receipt No:', 50, startY);
    doc.font('Helvetica').text(donation.paymentId || donation.orderId, 150, startY);

    doc.font('Helvetica-Bold').text('Date:', 350, startY);
    doc.font('Helvetica').text(new Date(donation.updatedAt).toLocaleDateString(), 400, startY);

    doc.moveDown(1.5);

    doc.fontSize(12).font('Helvetica').text(`This is to certify that we have received a generous donation of `, 50, doc.y, { continued: true });
    doc.font('Helvetica-Bold').text(`INR ${donation.amount.toLocaleString('en-IN')}/-`, { continued: true });
    doc.font('Helvetica').text(` from:`);
    
    doc.moveDown(1);
    doc.fontSize(14).font('Helvetica-Bold').text(user?.name?.toUpperCase() || 'VALUED DONOR', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica').text(`Email: ${user?.email || 'N/A'}`, { align: 'center' });

    doc.moveDown(2);

    // --- Trust Info Table-like structure ---
    doc.rect(50, doc.y, 495, 60).fill('#fdf8ed').stroke('#d4a017');
    doc.fillColor('#8a7d60').fontSize(9);
    doc.text('Statutory Details for Income Tax Exemption:', 60, doc.y + 10);
    doc.moveDown(0.5);
    doc.text('1. This receipt is issued for tax exemption under section 80G of the Income Tax Act, 1961.', 60);
    doc.text('2. Foundation PAN: AAATU0000X | Validity: Lifetime (Order No: IT-SEC4/12A/92)', 60);
    
    doc.moveDown(4);

    // --- Footer & Sign ---
    doc.fillColor('#333').fontSize(11).text('Authorized Signatory', 380, doc.y, { align: 'right' });
    doc.fontSize(8).fillColor('#999').text('This is a computer-generated document and does not require a physical signature.', 50, 750, { align: 'center' });

    doc.end();
  }
}

module.exports = ReceiptService;
