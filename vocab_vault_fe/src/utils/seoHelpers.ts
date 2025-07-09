export const generateWebsiteStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Vocab Vault',
  description: 'Nền tảng học từ vựng tương tác với flashcard, trò chơi và bài kiểm tra',
  url: 'https://vocab-vault.site',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'VND'
  },
  featureList: [
    'Flashcard Tương Tác',
    'Trò Chơi Từ Vựng',
    'Bài Kiểm Tra Trắc Nghiệm',
    'Luyện Đọc Hiểu',
    'Tạo Bộ Từ Vựng Tùy Chỉnh',
    'Theo Dõi Tiến Độ'
  ]
});

export const generateEducationalContentStructuredData = (deck: any) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: deck.title,
  description: deck.description || `Học từ vựng với bộ từ ${deck.title}`,
  provider: {
    '@type': 'Organization',
    name: 'Vocab Vault'
  },
  educationalLevel: 'Từ Cơ Bản Đến Nâng Cao',
  about: {
    '@type': 'Thing',
    name: 'Học Từ Vựng'
  },
  dateCreated: deck.createAt,
  courseMode: 'online',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    instructor: {
      '@type': 'Organization',
      name: 'Vocab Vault'
    }
  }
});

export const generateFlashcardStructuredData = (deck: any) => ({
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: `${deck.title} - Flashcard`,
  description: `Chế độ học flashcard tương tác cho bộ từ vựng ${deck.title}`,
  learningResourceType: 'Flashcard',
  educationalUse: 'study',
  educationalLevel: 'tất cả cấp độ',
  about: {
    '@type': 'Thing',
    name: 'Học Từ Vựng'
  }
});

export const generateGameStructuredData = (deck: any, gameType: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Game',
  name: `${deck.title} - ${gameType}`,
  description: `Trò chơi ${gameType.toLowerCase()} tương tác để học từ vựng ${deck.title}`,
  genre: 'Trò Chơi Giáo Dục',
  educationalUse: 'practice',
  gamePlatform: 'Trình Duyệt Web'
});

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string, url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const generateFAQStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Vocab Vault là gì?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vocab Vault là nền tảng học từ vựng tương tác giúp bạn thành thạo từ mới thông qua flashcard, trò chơi và bài kiểm tra.'
      }
    },
    {
      '@type': 'Question',
      name: 'Làm thế nào để tạo bộ từ vựng?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bạn có thể tạo bộ từ vựng tùy chỉnh bằng cách đăng ký tài khoản và sử dụng công cụ tạo bộ từ để thêm từ và định nghĩa.'
      }
    },
    {
      '@type': 'Question',
      name: 'Có những chế độ học nào?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chúng tôi cung cấp nhiều chế độ học bao gồm flashcard, trò chơi ghép thẻ, bài kiểm tra trắc nghiệm và bài tập đọc hiểu.'
      }
    }
  ]
}); 