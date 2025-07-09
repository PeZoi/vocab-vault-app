const fs = require('fs');
const path = require('path');

// Hàm tạo sitemap động cho các trang deck
async function generateDynamicSitemap() {
   try {
      // URL cơ bản của website
      const baseUrl = 'https://vocab-vault.site';
      const currentDate = new Date().toISOString().split('T')[0];

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

      // TODO: Fetch dynamic deck pages from your API
      // const decks = await fetchDecksFromAPI();
      // const dynamicPages = decks.map(deck => ({
      //   url: `/decks/${deck.id}`,
      //   lastmod: deck.updateAt || deck.createAt,
      //   changefreq: 'weekly',
      //   priority: '0.8'
      // }));

      // Tạm thời sử dụng pages tĩnh, bạn có thể thêm dynamic pages sau
      const allPages = staticPages;

      // Tạo XML sitemap
      const sitemapXml = generateSitemapXml(baseUrl, allPages);

      // Ghi file sitemap.xml
      const publicDir = path.join(__dirname, '..', 'public');
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);

      console.log('✅ Sitemap generated successfully!');
      console.log(`📄 Total pages: ${allPages.length}`);
      console.log(`📍 Location: public/sitemap.xml`);
   } catch (error) {
      console.error('❌ Error generating sitemap:', error);
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

// Chạy script
if (require.main === module) {
   generateDynamicSitemap();
}

module.exports = { generateDynamicSitemap };
