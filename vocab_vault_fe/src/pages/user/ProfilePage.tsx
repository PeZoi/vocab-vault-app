import { LockOutlined, MailOutlined, UserOutlined, CameraOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Avatar, Upload, Card, Typography, Divider, Row, Col, Collapse, Modal } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInformationUser } from 'pages/auth';
import { updateProfileAPI, getProfileAPI, updatePasswordAPI } from 'apis';
import { UserType } from 'types';
import type { UploadFile, UploadProps } from 'antd';

const { Title, Text } = Typography;
const { Panel } = Collapse;

type UpdateProfileFormType = {
  fullName: string;
  email: string;
};

type ChangePasswordFormType = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [showAvatarConfirm, setShowAvatarConfirm] = useState(false);
  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
      });
      
      if (user.avatar) {
        setFileList([
          {
            uid: '-1',
            name: 'avatar.jpg',
            status: 'done',
            url: user.avatar,
          },
        ]);
      }
    }
  }, [user, form]);

  const handleUpdate = async (values: UpdateProfileFormType) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const updateData: any = {
        fullName: values.fullName,
      };

      // If there's a confirmed new avatar (base64), include it
      if (previewAvatar && previewAvatar.startsWith('data:')) {
        updateData.avatar = previewAvatar;
      }

      const response = await updateProfileAPI(updateData);
      
      if (response?.status === 200 || response?.data) {
        // Update Redux store with new user information
        const updatedUser: UserType = {
          ...user,
          ...updateData,
        };
        
        dispatch(updateInformationUser(updatedUser));
        message.success('Cập nhật thông tin thành công!');
        setIsEditing(false);
        setPreviewAvatar(null);
        setShowAvatarConfirm(false);
        
        // Refresh user data from server
        try {
          const profileResponse = await getProfileAPI();
          if (profileResponse?.data) {
            dispatch(updateInformationUser(profileResponse.data));
          }
        } catch (refreshError) {
          console.log('Failed to refresh profile data:', refreshError);
        }
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values: ChangePasswordFormType) => {
    setPasswordLoading(true);
    try {
      const response = await updatePasswordAPI({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      
      if (response?.status === 200) {
        message.success('Đổi mật khẩu thành công!');
        passwordForm.resetFields();
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewAvatar(null);
    setShowAvatarConfirm(false);
    setPendingAvatarFile(null);
    
    if (user) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
      });
      
      if (user.avatar) {
        setFileList([
          {
            uid: '-1',
            name: 'avatar.jpg',
            status: 'done',
            url: user.avatar,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  };

  const handleAvatarConfirm = () => {
    if (pendingAvatarFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setPreviewAvatar(base64);
        
        // Update fileList to show the selected image
        const newFile: UploadFile = {
          uid: Date.now().toString(),
          name: pendingAvatarFile.name,
          status: 'done',
          url: base64,
        };
        setFileList([newFile]);
        
        setShowAvatarConfirm(false);
        setPendingAvatarFile(null);
        message.success('Avatar đã được chọn. Nhấn "Lưu thay đổi" để cập nhật.');
      };
      reader.readAsDataURL(pendingAvatarFile);
    }
  };

  const handleAvatarCancel = () => {
    setShowAvatarConfirm(false);
    setPendingAvatarFile(null);
    // Reset to original avatar
    if (user?.avatar) {
      setFileList([{
        uid: '-1',
        name: 'avatar.jpg',
        status: 'done',
        url: user.avatar,
      }]);
    } else {
      setFileList([]);
    }
  };

  const handleFileSelect = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Chỉ có thể tải lên file hình ảnh!');
      return;
    }
    
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Kích thước file phải nhỏ hơn 2MB!');
      return;
    }

    setPendingAvatarFile(file);
    setShowAvatarConfirm(true);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-circle',
    fileList,
    beforeUpload: (file) => {
      handleFileSelect(file);
      return false; // Prevent automatic upload
    },
    onRemove: () => {
      setPreviewAvatar(null);
      setPendingAvatarFile(null);
      setFileList([]);
      return true;
    },
    showUploadList: {
      showPreviewIcon: false,
      showRemoveIcon: isEditing,
    },
    accept: 'image/*',
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Text>Vui lòng đăng nhập để xem thông tin cá nhân</Text>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">
            Thông tin cá nhân
          </Title>
          <Text type="secondary">
            Quản lý thông tin tài khoản của bạn
          </Text>
        </div>

        <Row gutter={[32, 32]}>
          {/* Avatar Section */}
          <Col xs={24} md={8}>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                {isEditing ? (
                  <Upload {...uploadProps}>
                    {fileList.length === 0 && (
                      <div className="text-center">
                        <CameraOutlined className="text-2xl text-gray-400 mb-2" />
                        <div className="text-sm text-gray-500">Tải ảnh lên</div>
                      </div>
                    )}
                  </Upload>
                ) : (
                  <Avatar
                    size={128}
                    src={previewAvatar || user.avatar}
                    icon={<UserOutlined />}
                    className="border-4 border-white shadow-lg"
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <Title level={4} className="mb-1">
                  {user.fullName}
                </Title>
                <Text type="secondary" className="block text-sm">
                  Tham gia: {new Date(user.createAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit', 
                    year: 'numeric'
                  })}
                </Text>
                <Text type="secondary" className="block">
                  Đăng nhập bằng {user.type || 'hệ thống'}
                </Text>
              </div>
            </div>
          </Col>

          {/* Form Section */}
          <Col xs={24} md={16}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleUpdate}
              disabled={!isEditing}
              className="space-y-4"
            >
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ và tên',
                  },
                  {
                    min: 2,
                    message: 'Họ tên phải có ít nhất 2 ký tự',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Nhập họ và tên"
                  size="large"
                  className={!isEditing ? 'bg-gray-50' : ''}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Nhập email"
                  size="large"
                  disabled={true}
                />
              </Form.Item>

              <Divider />
            </Form>
            
            <div className="flex gap-3 justify-end mt-4">
              {!isEditing ? (
                <Button
                  type="primary"
                  size="large"
                  onClick={() => setIsEditing(true)}
                  className="px-8"
                >
                  Chỉnh sửa thông tin
                </Button>
              ) : (
                <>
                  <Button
                    size="large"
                    onClick={handleCancel}
                    className="px-6"
                  >
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => form.submit()}
                    loading={loading}
                    size="large"
                    className="px-8"
                  >
                    Lưu thay đổi
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>

        {user.type !== 'GOOGLE' && <>
          <Divider className="my-8" />

          {/* Password Change Section */}
          <div className="mt-8 flex justify-center">
            <Collapse ghost className='w-full' >
              <Panel header={
                <div className="flex items-center gap-2">
                  <LockOutlined />
                  <span className="font-medium">Đổi mật khẩu</span>
                </div>
              } key="1">
                <Form
                  form={passwordForm}
                  layout="vertical"
                  onFinish={handlePasswordChange}
                  className="max-w-md mx-auto"
                >
                  <Form.Item
                    label="Mật khẩu hiện tại"
                    name="currentPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu hiện tại',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Nhập mật khẩu hiện tại"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu mới"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới',
                      },
                      {
                        min: 8,
                        message: 'Mật khẩu phải có ít nhất 8 ký tự',
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Nhập mật khẩu mới"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Xác nhận mật khẩu mới"
                    name="confirmPassword"
                    dependencies={['newPassword']}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng xác nhận mật khẩu mới',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined />}
                      placeholder="Xác nhận mật khẩu mới"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={passwordLoading}
                      size="large"
                      className="px-8 w-full"
                    >
                      Đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
              </Panel>
            </Collapse>
          </div>
        </>}
      </Card>

      {/* Avatar Confirmation Modal */}
      <Modal
        title="Xác nhận thay đổi avatar"
        open={showAvatarConfirm}
        onCancel={handleAvatarCancel}
        footer={null}
        centered
        width={400}
      >
        <div className="text-center py-4">
          <div className="mb-4">
            <Avatar
              size={120}
              src={pendingAvatarFile ? URL.createObjectURL(pendingAvatarFile) : undefined}
              icon={<UserOutlined />}
              className="border-4 border-white shadow-lg"
            />
          </div>
          <Text className="block mb-6">
            Bạn có muốn sử dụng ảnh này làm avatar không?
          </Text>
          <div className="flex gap-3 justify-center">
            <Button
              icon={<CloseOutlined />}
              onClick={handleAvatarCancel}
              size="large"
            >
              Hủy bỏ
            </Button>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleAvatarConfirm}
              size="large"
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
