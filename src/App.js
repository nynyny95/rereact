// 이 곳에서 내용을 편집하며 UI를 만들게 됨
// import logo from './logo.svg';
import './App.css';

// 컴포넌트(사용자 정의 태그)를 만들 시 반드시 대문자로 시작해야 함!

// Header함수에 첫 번째 파라미터로 props를 줘 보기
// -> console 확인 시 Object가 들어옴
function Header(props) {
  // props에 어떤 인자(데이터)가 들어오는지 console로 확인해보기
  console.log('props', props, props.title);
  // return값에 'props.title' 문자 그대로 출력되므로 중괄호로 묶어줘야함!
  // 중괄호로 묶어주면 일반적인 문자열이 아니라 표현식으로 취급됨

// function Header() {
  return <header>
      {/* <h1><a href='/'>WEB</a></h1> */}
      {/* onClick이라는 이벤트(유사 html이므로 코드 작성 시 리액트 개발환경이 브라우저가 이해하는 html로 컨버팅해주는 것이기에 문법이 다르다!) */}
      {/* event 파라미터 객체: event 상황을 제어할 수 있는 정보 보유! */}
      <h1><a href='/' onClick={function(event) {
          // a태그가 가진 기본 동작(링크오픈으로 인한 리로드) 기능 정지
          event.preventDefault();
          // onClick 함수 호출 시 Header의 props로 전달된 onChangeMode가 가리키는 함수 호출하기
          props.onChangeMode();
        }
      }>{props.title}</a></h1>
    </header> // 홈으로 이동
}


function Nav(props) {
  const lis = [
    // <li><a href='/read/1'>html</a></li>,
    // <li><a href='/read/2'>css</a></li>,
    // <li><a href='/read/3'>js</a></li>,
  ]

  // map을 많이 쓰나 좀 어려움 -> for문 사용해보기
  // topics의 원소 수만큼 반복되는 구문
  // 웹 검사 후 콘솔창 보면
  // Each child in a list should have a unique "key" prop.
  // 오류가 뜸: 각각의 li태그는 각자 key라는 prop을 가지고
  // 반복문 안에서 고유해야 한다는 의미
  // -> 리액트는 자동으로 생성한 태그의 경우 추적 시 근거가 필요함
  // => 고유 값으로 인해 정확한 동작을 할 수 있게됨
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}><a href={'/read/' + t.id}>{t.title}</a></li>);
  }

  return <nav>
    <ol>
      {/* <li><a href='/read/1'>html</a></li>
      <li><a href='/read/2'>css</a></li>
      <li><a href='/read/3'>js</a></li> */}
      {/* 배열을 갖다주면 원소를 하나씩 꺼내서 출력됨 */}
      {/* 이렇게만 하면 어디 쓸 데가 없어짐 */}
      {lis}
    </ol>
  </nav>  // html, css, javascript와 같은 구체적인 글을 보는 영역
}

function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>  // 본문 표시 영역
}

// 정보 직접 입력을 하는 하드코딩이 아닌
// 자바스크립트 데이터스트럭쳐에 맞게 주기
function App() {
  // 변수 topics 정의 시 함수 안에서는 바뀌지 않으므로 const로 선언!
  // -> 코드가 더 튼튼해짐~
  // 정보가 여러 개 이므로 배열로 선언하고 제목과 본문, id값을 객체에 넣기
  const topics = [
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]

  // 화면 구성하는 코드(리턴값)
  return (
    <div className="App">
      {/* title 속성(props)에 REACT 값을 줘서 정의해보기! */}
      <Header title="WEB" onChangeMode={function() {
          alert('Header');
        }
      }></Header>
      
      {/* <Nav topics="topics"></Nav> */}
      
      {/* 중괄호로 감싸면 문자열이 아닌 있는 그대로 전달돰 */}
      <Nav topics={topics}></Nav>
      
      <Article title="Welcome" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;

/* Hello, React! */
/* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
*/



// 리액트는 컴포넌트(사용자 정의 태그)를 만드는 기술이다! -> 리액트의 본질
// (정리정돈! 서로 연관된 것을 그루핑, 그룹화하여 연결하고 이름을 지어줌)


// 배포방법!
/*

npm start를 통해 실행한 어플리케이션은
실제 서비스하기엔 용량이 크며
여러가지 불필요한 메시지를 나타내기에
실제 서비스에 최적하된 배포분은 아님

터미널을 키고서 기존 켜진 개발환경을 ctrl + C 를 통해 끄고
npm run build 입력하여 배포판을 만들면 build라는 폴더 생성되며
index.html위시한 다른 파일이 있으며 공백 조차 없는 코딩이 되어있음
-> 최대한 용량 다이어트!

해당 결과물을 실행하려면?
npx serve -s build
(서브라는 앱을 추천하며 이 웹 서버에 -s라는 옵션을 주게 되어
  사용자가 어떤 경로로 들어오든 index.html을 서비스해주게됨!
  그리고 build라는 폴더를 지정하면
  해당 폴더에 있는 index.html을 서비스 해주겠다는 거임!
  서브는 Node.js로 만들어진 애플리케이션이기에
  간편 실행 시 npx을 사용!)
-> 링크와 함께 실제 서비스에서 사용할 수 있는 버전의 파일이 실행된 모습 확인

*/


// 장점
/*

  간단해진 코드,
  어떤 취지의 태그인지 이름을 통해 직관적 해석 가능,
  컴포넌트 내의 코드 변경 시 모든 동일 태그에서 동시 수정 효과
  -> 여러 태그를 하나의 독립된 부품으로 만들 수 있게 되었고
  이를 통해 더 적은 복잡도로 소프트웨어를 만들 수 있음과 동시에
  내가 만들거나 타인이 만든 컴포넌트를 사용하기 용이하게 되어
  생산성을 획기적으로 끌어올림!

*/


// 용어 정의 || 설명
/*

props: 컴포넌트의 속성(ex, img 태그의 width나 src 같은 속성!)

event 기능: 컴포넌트에 어떤 일이 발생 시
            사용자가 추가적인 어떤 작업을 처리할 수 있게 함
            (onClick event로 사용자가 버튼 클릭 시 경고창을 띄워줌)

*/