import { Card, Typography, Space, Row, Col, Avatar, Divider } from 'antd';
import { BookOutlined, BulbOutlined, TeamOutlined, ToolOutlined, ReadOutlined, RocketOutlined } from '@ant-design/icons';
import { useSEO } from 'hooks';
import React from 'react';
import { generateFAQStructuredData } from 'utils';

const { Title, Paragraph, Text } = Typography;

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <Card 
      className={`h-full rounded-lg border border-gray-100 overflow-hidden transition-all duration-300 ${
        isHovered ? 'transform -translate-y-1 shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      bordered={false}
    >
      <Space direction="vertical" align="center" size="middle" className="w-full">
        <Avatar size={80} icon={icon} className="bg-blue-500 text-white mb-4" />
        <div>
          <div className="text-lg font-semibold mb-2 text-gray-800">{title}</div>
          <Text className="text-gray-500 text-center">{description}</Text>
        </div>
      </Space>
    </Card>
  );
};

export function AboutPage() {
  // SEO optimization for About page
  useSEO({
    title: 'Giới Thiệu Vocab Vault - Nền Tảng Học Từ Vựng Tiên Tiến',
    description: 'Tìm hiểu về Vocab Vault, nền tảng học từ vựng hiện đại giúp bạn mở rộng vốn từ vựng hiệu quả với flashcard tương tác, trò chơi và công nghệ lặp lại ngắt quãng.',
    keywords: 'giới thiệu vocab vault, nền tảng học từ vựng, lặp lại ngắt quãng, ứng dụng flashcard, học ngôn ngữ, công nghệ giáo dục',
    url: 'https://vocab-vault.site/about',
    type: 'article',
    structuredData: generateFAQStructuredData()
  });

  return (
    <div className="max-w-6xl mx-auto py-5">
      <Typography className="about-page">
        <header className="text-center mb-10">
          <Title level={1} className="text-blue-500 font-semibold relative inline-block">
            Giới Thiệu Về Vocab Vault
            <div className="h-0.5 w-20 bg-blue-500 mx-auto mt-4"></div>
          </Title>
          <Paragraph className="text-base max-w-2xl mx-auto text-gray-500">
            Nền tảng học từ vựng hiện đại giúp bạn mở rộng vốn từ một cách hiệu quả và thú vị
          </Paragraph>
        </header>
        
        <Card className="mb-8 shadow-md rounded-lg overflow-hidden border-0" bordered={false}>
          <Row gutter={[32, 24]}>
            <Col xs={24} md={12}>
              <Paragraph className="text-base leading-relaxed">
                <strong className="text-blue-500 text-lg">Vocab Vault</strong> là ứng dụng học từ vựng tiên tiến được thiết kế để giúp bạn
                mở rộng vốn từ vựng một cách hiệu quả và thú vị. Ứng dụng cung cấp trải nghiệm học tập cá nhân hóa, 
                với nhiều phương pháp học khác nhau phù hợp với từng người dùng.
              </Paragraph>
              
              <Paragraph className="text-base leading-relaxed">
                Chúng tôi kết hợp các phương pháp học hiện đại với công nghệ thông minh để tạo ra
                trải nghiệm học tập cá nhân hóa, giúp bạn ghi nhớ từ vựng lâu dài và sử dụng chúng
                tự nhiên trong giao tiếp hàng ngày.
              </Paragraph>
            </Col>
            <Col xs={24} md={12} className="flex items-center justify-center">
              <div className="w-full h-60 bg-gradient-to-br from-blue-50 to-blue-200 rounded-lg flex items-center justify-center">
                <ReadOutlined className="text-6xl text-blue-500" />
              </div>
            </Col>
          </Row>
        </Card>

        <div className="mb-8">
          <div className="relative mb-8">
            <Title level={2} className="font-semibold relative inline-block pb-2">
              Tính Năng Chính
              <div className="absolute bottom-0 left-0 h-0.5 w-10 bg-blue-500"></div>
            </Title>
          </div>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} md={6}>
              <FeatureCard 
                icon={<BookOutlined />} 
                title="Bộ Sưu Tập Từ" 
                description="Tạo và quản lý các bộ thẻ từ vựng theo chủ đề, cấp độ hoặc mục đích học tập."
              />
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <FeatureCard 
                icon={<BulbOutlined />} 
                title="Học Tương Tác" 
                description="Đa dạng phương thức học: flashcard, trắc nghiệm, ghép thẻ, và nhiều hình thức khác."
              />
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <FeatureCard 
                icon={<ToolOutlined />} 
                title="Công Nghệ Thông Minh" 
                description="Thuật toán học tập thích ứng giúp tối ưu quá trình ghi nhớ từ vựng."
              />
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <FeatureCard 
                icon={<TeamOutlined />} 
                title="Cộng Đồng" 
                description="Chia sẻ bộ thẻ, thách đấu bạn bè và theo dõi tiến độ học tập."
              />
            </Col>
          </Row>
        </div>

        <Card className="mb-8 rounded-lg border-0 bg-gradient-to-br from-gray-50 to-gray-200" bordered={false}>
          <div className="relative mb-6">
            <Title level={2} className="font-semibold relative inline-block pb-3">
              Phương Pháp Học Tập
              <div className="absolute bottom-0 left-0 h-0.5 w-10 bg-blue-500"></div>
            </Title>
          </div>
          
          <Row gutter={[32, 24]}>
            <Col xs={24} md={12}>
              <div className="mb-4 flex items-start">
                <RocketOutlined className="text-blue-500 mr-2 text-base mt-1" />
                <div>
                  <Text strong className="text-base block mb-1 text-gray-800">Lặp lại ngắt quãng</Text>
                  <Text className="text-gray-500">
                    Chúng tôi áp dụng phương pháp khoa học giúp bạn ôn tập từ vựng vào những thời điểm tối ưu nhất để tăng khả năng ghi nhớ lâu dài.
                  </Text>
                </div>
              </div>
              
              <div className="mb-4 flex items-start">
                <RocketOutlined className="text-blue-500 mr-2 text-base mt-1" />
                <div>
                  <Text strong className="text-base block mb-1 text-gray-800">Học tập đa giác quan</Text>
                  <Text className="text-gray-500">
                    Kết hợp hình ảnh, âm thanh và ngữ cảnh để tạo kết nối mạnh mẽ với từ vựng mới.
                  </Text>
                </div>
              </div>
            </Col>
            
            <Col xs={24} md={12}>
              <div className="mb-4 flex items-start">
                <RocketOutlined className="text-blue-500 mr-2 text-base mt-1" />
                <div>
                  <Text strong className="text-base block mb-1 text-gray-800">Cá nhân hóa</Text>
                  <Text className="text-gray-500">
                    Hệ thống thông minh điều chỉnh nội dung học tập dựa trên hiệu suất và sở thích của bạn.
                  </Text>
                </div>
              </div>
              
              <div className="mb-4 flex items-start">
                <RocketOutlined className="text-blue-500 mr-2 text-base mt-1" />
                <div>
                  <Text strong className="text-base block mb-1 text-gray-800">Ứng dụng thực tế</Text>
                  <Text className="text-gray-500">
                    Giúp bạn hiểu cách sử dụng từ vựng trong ngữ cảnh thực tế và đa dạng.
                  </Text>
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        <Card className="rounded-lg border-0 bg-gradient-to-br from-gray-50 to-blue-50" bordered={false}>
          <div className="relative mb-6">
            <Title level={2} className="font-semibold relative inline-block pb-3">
              Liên Hệ
              <div className="absolute bottom-0 left-0 h-0.5 w-10 bg-blue-500"></div>
            </Title>
          </div>
          
          <Paragraph className="text-base mb-6">
            Chúng tôi luôn mong muốn nhận được phản hồi từ người dùng để cải thiện ứng dụng.
            Nếu bạn có bất kỳ câu hỏi, góp ý hoặc đề xuất, xin vui lòng liên hệ với chúng tôi qua:
          </Paragraph>
          
          <Row gutter={[32, 16]}>
            <Col xs={24} md={12}>
              <div className="flex items-center mb-2">
                <BookOutlined className="text-blue-500 mr-2.5 text-base" />
                <Text strong>Email:</Text>
                <Text className="ml-2">support@vocabvault.com</Text>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="flex items-center mb-2">
                <BookOutlined className="text-blue-500 mr-2.5 text-base" />
                <Text strong>Website:</Text>
                <Text className="ml-2">www.vocabvault.com</Text>
              </div>
            </Col>
          </Row>
          
          <Divider className="my-6" />
          
          <div className="text-center">
            <Text className="text-gray-500">© 2025 Vocab Vault. Bản quyền thuộc về Vocab Vault.</Text>
          </div>
        </Card>
      </Typography>
    </div>
  );
}
