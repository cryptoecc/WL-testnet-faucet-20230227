import React, { useEffect, useState } from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Typography ,Row, Col, Button,Divider, Input,Dropdown, Space,message} from 'antd';
import '../style/Layout.scss';
import bg1 from '../../assets/bg_img1.svg';
import bg2 from '../../assets/bg_img2.svg';
import Web3 from 'web3';

const { Content } = Layout;
const {Text,Title} = Typography;
declare let window: any;

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
        label: 'WorldLand',
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


async function SendETH (){
    // onClick sendETH
    // 현재 사용자가 가진 이더리움 지갑을 찾습니다.
  if (window.ethereum) {
    alert("진행중 입니다. 확인버튼을 누르시고 잠시만 기다려주세요.")

    try {
    // 이더리움 지갑과 연결합니다.
    await window.ethereum.enable();

    // Set up web3 provider
    const providerUrl = 'https://rpc.lvscan.io';
    const web3Provider = new Web3.providers.HttpProvider(providerUrl);

    // Web3 인스턴스를 생성합니다.
    const web3 = new Web3(window.ethereum);

    // 현재 계정 주소를 가져옵니다.
    // const accounts = await web3.eth.getAccounts();
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
    const account = accounts[0];

    const LV_ADDRESS = "0x16439362f97172F66Ec65320807c7a8271a7eA96";
    const PrivateKey = "7def6b172e169cafa14dc1d6a5ef34b139cf2fc7e60caf7287f33645008dd35b";

    // 송금할 이더 및 GAS를 설정합니다.
    const value = web3.utils.toWei("0.1", "ether");
    const gasPrice = web3.utils.toWei('20', 'gwei');
    const gasLimit = 53000;

   

    // 송금 트랜잭션을 생성합니다.
    const tx = {
        from: LV_ADDRESS, // 내 계정
        to: account,
        value: value,
        gasPrice : gasPrice,
        gas: gasLimit
    };

    // Sign transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, PrivateKey);
    // @ts-ignore
    const sentTx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    // 송금 트랜잭션을 전송합니다.
    alert("완료되었습니다. 24시간 후 다시 시도해주세요.")
    await web3.eth.sendTransaction(tx);

    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("이더리움 지갑을 찾을 수 없습니다.");
  }
}

const AppLayout = () => {
    const [web3, setWeb3] = useState<any>(null);
    const [accounts, setAccounts] = useState<any>([]);
    const [ipAddress, setIpAddress] = useState(null);

    const initWeb3 = async () => {
        if (window.ethereum) {
          try {
            await window.ethereum.enable();
            const web3 = new Web3(window.ethereum);
            setWeb3(web3);
            const accounts = await web3.eth.getAccounts();
            setAccounts(accounts);
            console.log(accounts);
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error("MetaMask를 찾을 수 없습니다.");
        }

        fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => setIpAddress(data.ip))
        .catch(error => console.error(error));
  

      };

    useEffect(()=>{
    // 현재 사용자의 IP 주소를 가져옵니다.

    initWeb3();
    },[ipAddress])

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
                        <Button type="primary" block onClick={()=>{initWeb3()}}>
                            Connect Wallet
                        </Button>
                        {/* <ButtonComponent /> */}
                    </Col>
                    <Col span={24}>
                        <Divider>and</Divider>
                    </Col>
                    <Col span={24}>
                            <Input placeholder="Insert account address" value={accounts} />
                    </Col>
                    <Col span={24}>
                        {/* <Row gutter={12}>
                            <Col span={12} className={'drop_btn'}>
                                <Dropdown menu={menuProps_first}>
                                    <Button>
                                        <Space>
                                            WorldLand
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
                        </Row> */}
                    </Col>
                    <Col span={24}>
                        <Row gutter={12}>
                            <Col span={18}><Input placeholder="Basic usage" /></Col>
                            <Col span={6}><Button onClick={()=>{SendETH()}}>{}Send me ETH</Button></Col>
                        </Row>
                    </Col>
                </Row>

            </Content>
        </Layout>
    );
};

export default AppLayout;
