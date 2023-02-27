import React from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Typography ,Row, Col, Button,Divider, Input,Dropdown, Space,message} from 'antd';
import '../style/Layout.scss';
import bg1 from '../../assets/bg_img1.svg';
import bg2 from '../../assets/bg_img2.svg';

const { Content } = Layout;
const {Text,Title} = Typography;

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info('Click on left button.');
    console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const items: MenuProps['items'] = [
    {
        label: 'Ethereum1',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: 'Ethereum2',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: 'Ethereum3',
        key: '3',
        icon: <UserOutlined />,
        danger: true,
    },
    {
        label: 'Ethereum4',
        key: '4',
        icon: <UserOutlined />,
        danger: true,
        disabled: true,
    },
];
const menuProps_first = {
    items,
    onClick: handleMenuClick,
};
const menuProps_last = {
    items,
    onClick: handleMenuClick,
};

const AppLayout = () => {
    return (
        <Layout>
            <div className={"bg-img"}>
                <img src={bg1} alt={bg1} className={'bg1'}/>
                <img src={bg2} alt={bg2} className={'bg2'}/>
            </div>
            <Content className="site-layout">
                <Row justify={'center'} style={{textAlign:'center'}} className={'title'}>
                    <Col span={24}>
                        <Title level={1}>Request testnet ETH</Title>
                    </Col>
                    <Col span={24}>
                        <Text>We created an Ethereum Faucet for WLEth.</Text>
                    </Col>
                </Row>

                <Row style={{width:'40vw'}} className={'main_content'}>
                    <Col span={24}>
                        <Button type="primary" block>
                            Connect Wallet
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Divider>or</Divider>
                    </Col>
                    <Col span={24}>
                            <Input placeholder="Insert account address" />
                    </Col>
                    <Col span={24}>
                        <Row gutter={12}>
                            <Col span={12} className={'drop_btn'}>
                                <Dropdown menu={menuProps_first}>
                                    <Button>
                                        <Space>
                                            Ethereum
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </Col>
                            <Col span={12} className={'drop_btn'}>
                                <Dropdown menu={menuProps_last}>
                                    <Button>
                                        <Space>
                                            wlETH
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row gutter={12}>
                            <Col span={18}><Input placeholder="Basic usage" /></Col>
                            <Col span={6}><Button>Send me ETH</Button></Col>
                        </Row>
                    </Col>
                </Row>

            </Content>
        </Layout>
    );
};

export default AppLayout;
