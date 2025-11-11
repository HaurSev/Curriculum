import type { Cv, SkillCategory } from 'cv-graphql';
import jsPDF from 'jspdf';

export const generatePdf = (categories: SkillCategory[], cvData?: Cv) => {
  if (!cvData) return;

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const columnGap = 10;
  const columnWidth = (pageWidth - 2 * margin - columnGap) / 2;
  let y = margin;
  const lineHeight = 7;

  const addPageIfNeeded = (lines = 1) => {
    if (y + lineHeight * lines > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
  };

  pdf.setFontSize(22);
  pdf.setFont('helvetica', 'bold');
  pdf.text(cvData.user?.profile?.full_name || '', pageWidth / 2, y, {
    align: 'center',
  });
  y += lineHeight + 2;

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'normal');
  pdf.text(cvData.user?.position?.name || '', pageWidth / 2, y, {
    align: 'center',
  });
  y += lineHeight + 5;

  const xLeft = margin;
  const xRight = margin + columnWidth + columnGap;
  let yLeft = y;
  let yRight = y;

  const drawSection = (
    title: string,
    content: string | string[],
    x: number,
    yStart: number,
  ) => {
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, x, yStart);
    yStart += lineHeight;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    const lines: string[] = Array.isArray(content)
      ? content
      : pdf.splitTextToSize(content || '', columnWidth);
    lines.forEach((line) => {
      addPageIfNeeded(1);
      pdf.text(line, x, yStart);
      yStart += lineHeight;
    });

    return yStart + 3;
  };

  yLeft = drawSection('Education', cvData.education || '', xLeft, yLeft);
  yLeft = drawSection(
    'Language Proficiency',
    cvData.languages.map((lang) => lang.name).join(', ') || [],
    xLeft,
    yLeft,
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  yLeft = drawSection(
    'Domains',
    cvData.projects?.map((p) => p.domain).join(', ') || [],
    xLeft,
    yLeft,
  );

  yRight = drawSection('Description', cvData.description || '', xRight, yRight);
  for (const category of categories) {
    const skillsInCategory = cvData.skills.filter(
      (s) => s.categoryId === category.id,
    );

    if (skillsInCategory.length > 0) {
      const skillNames = skillsInCategory.map((s) => s.name).join(', ');
      yRight = drawSection(category.name, skillNames, xRight, yRight);
    }
  }

  const lineTop = margin + 20;
  const lineBottom = pageHeight - margin - 20;

  pdf.line(
    margin + columnWidth + columnGap / 2,
    lineTop,
    margin + columnWidth + columnGap / 2,
    lineBottom,
  );

  pdf.save(`${cvData.user?.profile?.full_name || 'CV'}.pdf`);
};
