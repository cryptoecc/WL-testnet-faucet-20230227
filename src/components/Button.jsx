import { useEffect, useState } from 'react';

function ButtonComponent() {
  const [isClicked, setIsClicked] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);
  const [prevIp, setPrevIp] = useState(null);
  
  const handleClick = () => {
    // 버튼 클릭 시 호출될 함수
    const currentIp = ipAddress; // 현재 사용자의 IP를 가져옵니다.
    if (currentIp === prevIp) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
      setPrevIp(currentIp);
    }
  };

  useEffect(() => {
    // 현재 사용자의 IP 주소를 가져옵니다.
    fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => console.error(error));
  }, []);

  
  return (
    <button onClick={handleClick} disabled={isClicked}>
      {isClicked ? '이미 클릭하셨습니다.' : '버튼'}
    </button>
  );
}

export default ButtonComponent;
