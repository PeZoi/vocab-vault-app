import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hàm tạo sitemap động cho các trang deck
async function generateDynamicSitemap() {
   try {
      console.log('🚀 Starting sitemap generation...');
      console.log('📁 Script directory:', __dirname);

      // URL cơ bản của website
      const baseUrl = 'https://vocab-vault.site';
      const currentDate = new Date().toISOString().split('T')[0];

      console.log('📅 Current date:', currentDate);

      // Các trang tĩnh
      const staticPages = [
         {
            url: '/',
            lastmod: currentDate,
            changefreq: 'daily',
            priority: '1.0',
         },
         {
            url: '/about',
            lastmod: currentDate,
            changefreq: 'monthly',
            priority: '0.8',
         },
         {
            url: '/decks',
            lastmod: currentDate,
            changefreq: 'daily',
            priority: '0.9',
         },
         {
            url: '/check-paragraph',
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: '0.7',
         },
         {
            url: '/sign-up',
            lastmod: currentDate,
            changefreq: 'yearly',
            priority: '0.6',
         },
      ];

      // Tạm thời sử dụng pages tĩnh, bạn có thể thêm dynamic pages sau
      const allPages = staticPages;

      console.log(`📋 Total pages to include: ${allPages.length}`);

      // Tạo XML sitemap
      const sitemapXml = generateSitemapXml(baseUrl, allPages);
      console.log('✏️ Sitemap XML generated');

      // Kiểm tra và tạo thư mục public
      const publicDir = path.join(__dirname, '..', 'public');
      console.log('📂 Public directory path:', publicDir);

      // Kiểm tra xem thư mục public có tồn tại không
      if (!fs.existsSync(publicDir)) {
         console.log('📁 Creating public directory...');
         fs.mkdirSync(publicDir, { recursive: true });
      } else {
         console.log('✅ Public directory exists');
      }

      // Đường dẫn file sitemap
      const sitemapPath = path.join(publicDir, 'sitemap.xml');
      console.log('📄 Sitemap file path:', sitemapPath);

      // Ghi file sitemap.xml
      fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

      // Kiểm tra xem file đã được tạo chưa
      if (fs.existsSync(sitemapPath)) {
         const stats = fs.statSync(sitemapPath);
         console.log('✅ Sitemap generated successfully!');
         console.log(`📄 Total pages: ${allPages.length}`);
         console.log(`📍 Location: ${sitemapPath}`);
         console.log(`📏 File size: ${stats.size} bytes`);
         console.log(`🕒 Created: ${stats.mtime}`);
      } else {
         console.error('❌ File was not created!');
      }
   } catch (error) {
      console.error('❌ Error generating sitemap:', error);
      console.error('Stack trace:', error.stack);
   }
}

// Hàm tạo XML từ danh sách pages
function generateSitemapXml(baseUrl, pages) {
   const urls = pages
      .map(
         (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
      )
      .join('');

   return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

// Chạy script - đơn giản hóa điều kiện
console.log('🎯 Script loaded, checking execution...');
console.log('📄 import.meta.url:', import.meta.url);
console.log('📄 process.argv[1]:', process.argv[1]);

// Chạy luôn khi được gọi trực tiếp
generateDynamicSitemap();

export { generateDynamicSitemap };
