import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

export const generateStudentsPDF = (students, title = 'Students Report') => {
  const pdf = new jsPDF('landscape');
  
  // Add cyberpunk-style title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(0, 255, 255); // Neon cyan
  pdf.text('🚀 ' + title, 20, 25);
  
  // Add subtitle with date and time
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(148, 163, 184);
  pdf.text(`⚡ Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 20, 35);
  
  // Add statistics
  pdf.setFontSize(14);
  pdf.setTextColor(0, 255, 0); // Neon green
  pdf.text(`📊 Total Records: ${students.length}`, 20, 45);
  
  // Prepare table data
  const tableColumns = [
    '🆔 ID',
    '👤 Name', 
    '📧 Email', 
    '📱 Phone', 
    '🌐 Language', 
    '⚥ Gender', 
    '🎂 Birth Date'
  ];
  
  const tableRows = students.map(student => [
    student.id,
    student.name,
    student.email,
    student.phone,
    student.language,
    student.gender,
    student.dob
  ]);
  
  // Add table with cyberpunk theme
  autoTable(pdf, {
    head: [tableColumns],
    body: tableRows,
    startY: 55,
    theme: 'grid',
    styles: {
      fontSize: 9,
      cellPadding: 4,
      fillColor: [0, 0, 0], // Pure black background
      textColor: [0, 255, 255], // Neon cyan text
      lineColor: [0, 255, 0], // Neon green borders
      lineWidth: 0.3,
      fontStyle: 'normal'
    },
    headStyles: {
      fillColor: [0, 20, 40], // Very dark blue header
      textColor: [0, 255, 255], // Neon cyan header text
      fontStyle: 'bold',
      fontSize: 10,
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [10, 10, 20], // Very dark purple-gray
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 40 },
      2: { cellWidth: 50 },
      3: { cellWidth: 35 },
      4: { cellWidth: 30 },
      5: { cellWidth: 25 },
      6: { cellWidth: 35 }
    },
    margin: { top: 55, left: 15, right: 15, bottom: 20 },
  });
  
  // Add cyberpunk footer with neon glow effect
  const pageCount = pdf.internal.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    
    // Add footer line
    pdf.setDrawColor(0, 255, 0); // Neon green
    pdf.setLineWidth(0.5);
    pdf.line(15, pdf.internal.pageSize.height - 20, pdf.internal.pageSize.width - 15, pdf.internal.pageSize.height - 20);
    
    // Add footer text
    pdf.setFontSize(8);
    pdf.setTextColor(0, 255, 255); // Neon cyan
    pdf.text(
      `🔒 CLASSIFIED | Page ${i}/${pageCount} | Student Management System v3.0`,
      pdf.internal.pageSize.width / 2,
      pdf.internal.pageSize.height - 15,
      { align: 'center' }
    );
  }
  
  // Add statistics page with cyberpunk design
  if (students.length > 0) {
    const stats = {
      total: students.length,
      male: students.filter(s => s.gender === 'Male').length,
      female: students.filter(s => s.gender === 'Female').length,
      others: students.filter(s => s.gender === 'Others').length,
      languages: [...new Set(students.map(s => s.language))].length
    };
    
    pdf.addPage();
    
    // Black background for stats page
    pdf.setFillColor(0, 0, 0);
    pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');
    
    // Glitch-style title
    pdf.setFontSize(20);
    pdf.setTextColor(0, 255, 0); // Neon green
    pdf.text('📊 SYSTEM ANALYTICS', 20, 30);
    
    pdf.setFontSize(12);
    let yPos = 50;
    
    const statLabels = {
      total: '🚀 Total Records',
      male: '👨 Male Students',
      female: '👩 Female Students', 
      others: '🌟 Other Students',
      languages: '🌐 Languages'
    };
    
    Object.entries(stats).forEach(([key, value], index) => {
      const colors = [[0, 255, 255], [0, 255, 0], [255, 0, 255], [255, 255, 0], [255, 128, 0]];
      pdf.setTextColor(...colors[index]);
      pdf.text(`${statLabels[key]}: ${value}`, 20, yPos);
      yPos += 20;
    });
  }
  
  // Save with cyberpunk filename
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  pdf.save(`CLASSIFIED_${title.toLowerCase().replace(/\s+/g, '_')}_${timestamp}.pdf`);
};

export const generateStudentDetailsPDF = (student) => {
  const pdf = new jsPDF();
  
  // Title
  pdf.setFontSize(20);
  pdf.setTextColor(168, 85, 247);
  pdf.text('Student Details', 20, 20);
  
  // Student info
  pdf.setFontSize(14);
  pdf.setTextColor(0, 0, 0);
  
  const details = [
    ['Name:', student.name],
    ['Email:', student.email],
    ['Phone:', student.phone],
    ['Language:', student.language],
    ['Gender:', student.gender],
    ['Date of Birth:', student.dob],
    ['Student ID:', student.id.toString()]
  ];
  
  let yPos = 40;
  details.forEach(([label, value]) => {
    pdf.setFont(undefined, 'bold');
    pdf.text(label, 20, yPos);
    pdf.setFont(undefined, 'normal');
    pdf.text(value, 70, yPos);
    yPos += 15;
  });
  
  // Footer
  pdf.setFontSize(10);
  pdf.setTextColor(150, 150, 150);
  pdf.text(
    `Generated on: ${new Date().toLocaleString()}`,
    20,
    pdf.internal.pageSize.height - 20
  );
  
  pdf.save(`student_${student.name.toLowerCase().replace(/\s+/g, '_')}_details.pdf`);
};

export const generateDashboardPDF = async (elementId, title = 'Dashboard Report') => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found for PDF generation');
    return;
  }
  
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#000000',
      scale: 2,
      logging: false,
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape');
    
    const imgWidth = 280;
    const pageHeight = 200;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    // Add title
    pdf.setFontSize(16);
    pdf.setTextColor(168, 85, 247);
    pdf.text(title, 20, 15);
    
    // Add image
    pdf.addImage(imgData, 'PNG', 10, 20, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save(`${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export const generateExcelData = (students) => {
  const csvContent = [
    ['ID', 'Name', 'Email', 'Phone', 'Language', 'Gender', 'Date of Birth'].join(','),
    ...students.map(student => 
      [
        student.id,
        `"${student.name}"`,
        `"${student.email}"`,
        `"${student.phone}"`,
        `"${student.language}"`,
        `"${student.gender}"`,
        `"${student.dob}"`
      ].join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `students_data_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};