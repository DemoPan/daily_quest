/**
 * High-performance isolated A4 printing utility
 * Eliminates browser "Loading preview..." freeze by bypassing fixed overlays and backdrop-filters.
 * Ensures 100% visual fidelity with zero modal backdrop borders or scrollbars.
 */
export function printIsolatedElement(element, docTitle = '打印学习单') {
  if (!element) return;

  // Find or create a hidden printing iframe
  let iframe = document.getElementById('a4-print-frame');
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'a4-print-frame';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);
  }

  const iframeDoc = iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(`
    <!DOCTYPE html>
    <html lang="zh-CN">
      <head>
        <meta charset="utf-8" />
        <title>${docTitle}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 10mm 12mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
            margin: 0;
            padding: 0;
            background: #ffffff !important;
            color: #0d1c2e !important;
            font-size: 10.5pt;
            line-height: 1.4;
          }
          .print-container {
            width: 100%;
            margin: 0 auto;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            margin-top: 4px;
            font-size: 9.5pt;
          }
          th, td {
            border: 1px solid #cbd5e1;
            padding: 5px 8px;
            text-align: left;
            word-break: break-word;
          }
          th {
            background-color: #f1f5f9 !important;
            font-weight: 700;
            color: #334155;
          }
          .subject-block {
            border: 1px solid #94a3b8;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 10px;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .subject-title-bar {
            background-color: #e2e8f0 !important;
            font-weight: bold;
            padding: 6px 10px;
            font-size: 10.5pt;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #94a3b8;
          }
          .badge-home {
            background-color: #fef3c7 !important;
            color: #92400e !important;
            border: 1px solid #fcd34d;
            border-radius: 4px;
            padding: 1px 6px;
            font-size: 8.5pt;
            font-weight: bold;
            display: inline-block;
          }
          .badge-school {
            background-color: #dbeafe !important;
            color: #1e40af !important;
            border: 1px solid #93c5fd;
            border-radius: 4px;
            padding: 1px 6px;
            font-size: 8.5pt;
            font-weight: bold;
            display: inline-block;
          }
          .badge-completed {
            color: #15803d !important;
            font-weight: bold;
          }
          .badge-stamp {
            color: #b45309 !important;
            font-weight: bold;
          }
          .signature-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 14px;
            padding-top: 10px;
            border-top: 2px solid #0f172a;
            break-inside: avoid;
          }
          .signature-card {
            border: 1px solid #94a3b8;
            border-radius: 8px;
            padding: 8px 10px;
            min-height: 70px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 9.5pt;
          }
          .weekly-poster {
            border: 4px double #d97706;
            border-radius: 14px;
            padding: 16px;
            background-color: #fffbeb !important;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
            margin: 12px 0;
            text-align: center;
          }
          .stats-box {
            background: #ffffff !important;
            border: 1px solid #fcd34d;
            border-radius: 8px;
            padding: 8px;
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          ${element.innerHTML}
        </div>
      </body>
    </html>
  `);
  iframeDoc.close();

  // Trigger print instantly after brief DOM parse
  setTimeout(() => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  }, 50);
}
