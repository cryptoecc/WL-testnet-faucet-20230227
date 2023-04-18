import React, { useState } from 'react';
import { Layout, Typography ,Row, Col, Button,Divider, Input} from 'antd';
import '../style/Layout.scss';
import bg1 from '../../assets/bg_img1.svg';
import bg2 from '../../assets/bg_img2.svg';
import Web3 from 'web3';

const { Content } = Layout;
const {Text,Title} = Typography;
declare let window: any;


const AppLayout = () => {
    const [web3, setWeb3] = useState<any>(null);
    const [accounts, setAccounts] = useState<any>([]);
    const [inputValue,setInputValue] = useState<string>("")

    function handleInputChange(event: { target: { value: any; }; }) {
        setInputValue(event.target.value);
        console.log(event.target.value);
    }

    async function isntEthereum_SendETH (){
        // Mobile
        alert("진행중 입니다. 확인버튼을 누르시고 잠시만 기다려주세요.")

        try {
            const infuraurl = 'https://rpc.lvscan.io' // https://rpc.lvscan.io'
            const web3 = new Web3(new Web3.providers.HttpProvider(infuraurl));
            const LV_ADDRESS = "0x16439362f97172F66Ec65320807c7a8271a7eA96";
            const PrivateKey:string = process.env.REACT_APP_PRIVATE_KEY!;

            // 송금할 이더 및 GAS를 설정합니다.
            const value = web3?.utils?.toWei("2", "ether");
            const gasPrice = web3?.utils?.toWei('20', 'gwei');
            const gasLimit = 53000;

            // 송금 트랜잭션을 생성합니다.
            const tx = {
                from: LV_ADDRESS, // 내 계정
                to: inputValue,
                value: value,
                gasPrice : gasPrice,
                gas: gasLimit
            };

            // Sign transaction
            const signedTx = await web3?.eth?.accounts?.signTransaction(tx, PrivateKey);
            // @ts-ignore
            const sentTx = await web3?.eth?.sendSignedTransaction(signedTx.rawTransaction);

            // 송금 트랜잭션을 전송합니다.
            await web3?.eth?.sendTransaction(tx);
            alert("완료되었습니다. 24시간 후 다시 시도해주세요.")
        } catch (error) {
            console.error(error);
        }
    }


    async function Desktop_SendETH (){
        console.log("Desktop Button");
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
        const PrivateKey:string = process.env.REACT_APP_PRIVATE_KEY!;
        // 송금할 이더 및 GAS를 설정합니다.
        const value = web3.utils.toWei("2", "ether");
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

    // Just connect wallet
    const initWeb3 = async () => {
        if (window.ethereum) {
          try {
            await window.ethereum.enable();
            const web3 = new Web3(window.ethereum);
            setWeb3(web3);
            const accounts = await web3.eth.getAccounts();
            setAccounts(accounts);
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error("MetaMask를 찾을 수 없습니다.");
        //   alert("MetaMask를 설치 후 시도해 주시기 바랍니다.")
          alert("MetaMask를 설치 후 시도해 주시기 바랍니다.")
        }
      };

    return (
        <Layout>
            <div className={"bg-img"}>
                <img src={bg1} alt={bg1} className={'bg1'}/>
                <img src={bg2} alt={bg2} className={'bg2'}/>
            </div>
            <Content className="site-layout">
                <Row justify={'center'} style={{textAlign:'center'}} className={'title'}>
                    <Col span={24}>
                        <Title level={1}>WorldLand TEST NETWORK</Title>
                    </Col>
                    <Col span={24}>
                        <Text>Fast and reliable. 2 WLC / day.</Text>
                    </Col>
                </Row>

                <Row style={{width:'40vw'}} className={'main_content'}>
                    <Col span={24}>
                        <Button type="primary" block onClick={()=>{initWeb3()}}>
                            Connect Wallet
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Divider>OR</Divider>
                    </Col>
                    <Col span={24}>
                        {window.ethereum ? 
                            <Input placeholder="Insert account address" value={accounts} />
                            :
                            <Input placeholder="Insert account address" value={inputValue} onChange={handleInputChange}/>
                        }
                    </Col>
                    <Col span={24}>
                    </Col>
                    <Col span={24}>
                        <Row gutter={12}>
                        {window.ethereum ?
                            <Col span={24}><Button onClick={()=>{Desktop_SendETH()}}>{}Send me WLC</Button></Col>
                                :
                            <Col span={24}><Button onClick={()=>{isntEthereum_SendETH()}}>{}Send me WLC</Button></Col>
                        }
                        </Row>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default AppLayout;