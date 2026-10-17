import { PRODUCTS, COMPANY_INFO } from '../data/companyData';

export function downloadExcelPricingSheet(): void {
  const headers = [
    'Item Code',
    'Product Name (English)',
    'اسم المنتج (العربية)',
    'Category / التصنيف',
    'Brand / الماركة',
    'Available Sizes / المقاسات والسعات',
    'Packaging / وحدة التعبئة',
    'Certifications / الاعتمادات',
    'Stock Status / حالة التوفر',
    'Sales Rep / ممثل المبيعات',
    'Direct WhatsApp / رقم الواتساب',
    'Email / البريد الرسمي',
    'Riyadh Address / عنوان الرياض',
  ];

  const escapeCsv = (val: string) => {
    if (!val) return '""';
    const clean = val.replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = PRODUCTS.map((item) => {
    const specsSummary = item.specsEn.join(' | ');
    return [
      escapeCsv(item.id.toUpperCase()),
      escapeCsv(item.nameEn),
      escapeCsv(item.nameAr),
      escapeCsv(item.category.replace('_', ' ').toUpperCase()),
      escapeCsv(item.brand),
      escapeCsv(specsSummary),
      escapeCsv(item.packagingEn),
      escapeCsv(item.certifications.join(', ')),
      escapeCsv(item.inStock ? 'In Stock (جاهز للتوريد)' : 'Order Upon Request'),
      escapeCsv(`${COMPANY_INFO.salesRep.nameEn} (${COMPANY_INFO.salesRep.nameAr})`),
      escapeCsv(COMPANY_INFO.phones.primaryWhatsApp),
      escapeCsv(COMPANY_INFO.email),
      escapeCsv(COMPANY_INFO.address.en),
    ].join(',');
  });

  // Prepend UTF-8 BOM (\uFEFF) so Excel correctly displays Arabic text
  const csvContent = '\uFEFF' + [headers.map(escapeCsv).join(','), ...rows].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'VALL_CARE_Trading_Medical_Supplies_Catalog_Pricing_2026.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
