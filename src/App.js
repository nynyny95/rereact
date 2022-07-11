// 이 곳에서 내용을 편집하며 UI를 만들게 됨
// import logo from './logo.svg';
import './App.css';
// state 사용을 위해 임포트 해야 함!
import {useState} from 'react';

// 컴포넌트(사용자 정의 태그)를 만들 시 반드시 대문자로 시작해야 함!

// Header함수에 첫 번째 파라미터로 props를 줘 보기
// -> console 확인 시 Object가 들어옴
function Header(props) {
  // props에 어떤 인자(데이터)가 들어오는지 console로 확인해보기
  // console.log('props', props, props.title);
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
          // onClick 함수 호출 시 Header의 props로 전달된 onChangeMode가 가리키는 함수 호출하기(실행)
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
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={function(event) {
        event.preventDefault();
        // event.target은 이벤트를 유발시킨 태그를 가리킴(여기선 a태그)
        // props.onChangeMode(event.target.id);

        // 문자열로 넘어온 숫자를 다시 숫자형으로 변환
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a></li>);
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

// function Create() {
function Create(props) {
  // 모드가 잘 바뀌었는지 확인해보기!
  // console.log('mode', mode);
  return <article>
          {/* 라벨 */}
          <h2>Create</h2>
          {/* 정보 전송용 태그인 form 사용 */}
          {/* form태그는 submit 시 페이지가 reload가 되므로 기능 상실 줘야함! */}
          {/* onSubmit 이벤트를 줘서 이를 처리해보기! */}
          <form onSubmit={event => {
            event.preventDefault();
            // target은 event 발생 태그인 form! 그 안의 title, body 가져오기
            const title = event.target.title.value;
            const body = event.target.body.value;
            // onCreate에게 props를 전달주기
            props.onCreate(title, body);
          }}>
            {/* title과 body 입력 창, submit 버튼 생성 - p태그로 블록처리 */}
            <p><input type='text' name='title' placeholder='title'></input></p>
            <p><textarea name='body' placeholder='body'></textarea></p>
            <p><input type='submit' value='Create'></input></p>
          </form>
         </article>
}

// 기존 내용을 수정하는 Update, 기존 title과 body의 값을 가져와야 함
// mode가 'READ'일 때 title과 body가 있기 때문에 이를 사용해보기!
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
          <h2>Update</h2>
          <form onSubmit={event => {
            event.preventDefault();
            const title = event.target.title.value;
            const body = event.target.body.value;
            props.onUpdate(title, body);
          }}>
            {/* props.value로 값을 가져오는 경우 변경할 수 없으므로 이를 state로 변경해야함 */}
            {/* <p><input type='text' name='title' placeholder='title' value={props.title}></input></p>
            <p><textarea name='body' placeholder='body' value={props.body}></textarea></p> */}
            
            {/* 여전히 바뀌지 않는 값! */}
            {/* <p><input type='text' name='title' placeholder='title' value={title}></input></p>
            <p><textarea name='body' placeholder='body' value={body}></textarea></p> */}
            
            {/* html과 다르게 동작하는 onChange 이벤트 -> 값을 입력할 때마다 호출됨! */}
            {/* 참고로 html에서는 값이 바뀌고 마우스 포인터가 밖으로 빠져나갈 때 호출됨 */}
            <p>
              <input type='text' name='title' placeholder='title'
                     value={title} onChange={event => {
                      // 값을 입력할 때마다 콘솔에 마지막 입력값만이 추가가 됨!
                      console.log(event.target.value);
                      // 새로운 키워드 입력 때마다 setTitle로 값을 입력 후 반영되는 것!
                      setTitle(event.target.value);
                     }}></input>
            </p>
            <p>
              <textarea name='body' placeholder='body'
                     value={body} onChange={event => {
                      setBody(event.target.value);
                     }}></textarea>
            </p>
            <p><input type='submit' value='Update'></input></p>
          </form>
         </article>
}

// 정보를 직접 입력하는 하드코딩이 아닌 js 데이터스트럭쳐에 맞게 주기
function App() {
  // 변수 topics 정의 시 함수 안에서는 바뀌지 않으므로 const로 선언!
  // -> 코드가 더 튼튼해짐~
  // 정보가 여러 개 이므로 배열로 선언하고 제목과 본문, id값을 객체에 넣기
  // const topics = [
  //   {id:1, title:'html', body:'html is...'},
  //   {id:2, title:'css', body:'css is...'},
  //   {id:3, title:'javascript', body:'javascript is...'}
  // ]

  // 승격시키기 - topics는 읽기용 인터페이스, setTopics는 쓰기용 인터페이스
  // 이제 topics에 들어갈 새로운 원소(객체)를 만들어야 함
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is...'},
    {id:2, title:'css', body:'css is...'},
    {id:3, title:'javascript', body:'javascript is...'}
  ]);
  // Id값은 여러 방법 중 별도로 관리하는 방법 사용 - state 새로 생성
  // 가장 마지막 원소의 id값이 3이므로 그 다음 원소에게 4를 부여함
  const [nextId, setNextId] = useState(4);

  // const mode = 'WELCOME';

  // // 스테이트를 활용하여 상태로 데이터 전환
  // const _mode = useState('WELCOME');
  // // useState 사용 시 배열을 리턴
  // // 0번째 원소는 상태의 값을 읽을 때 사용하고 1번째 원소는 상태의 값을 변경 시 사용하는 함수임
  // const mode = _mode[0];  // 상태 초기값 확인
  // const setMode = _mode[1];  // 상태 값 변경 함수 호출
  // console.log('_mode', _mode);
  
  // const 3행을 축약하면 아래와 같이 작성 가능 - 축약본으로 자주 사용됨!
  // 변수명은 mode, setMode 말고도 아무거나 해도 되지만 사용 위치는 동일하게 맞춰야함
  const [mode, setMode] = useState('WELCOME');
  // 어떤 글을 선택했는지 state로 만들어 Article 값 유동적으로 주기
  const [id, setId] = useState(null); // 현재는 값이 선택된 것이 없어 null 주기
  
  let content = null;
  // 맥락적으로 노출되는 UI라는 뜻인 변수 선언
  let contextControl = null;
  
  if (mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === 'READ'){
    // 아래 사항을 진행하지 않으면 선택 타이틀이 안 나오고 정해진 값이 나옴
    // content = <Article title="READ" body="Hello, READ"></Article>

    // 내부 컴포넌트 글을 클릭 시 id값이 바뀌면 컴포넌트가 새로 실행되면서 새로운 id 값 지정
    // 이 id 값으로 topics의 값 중 id와 비교하여 일치하는 것을 찾아 가져오면 됨!
    // 우선 title, body를 null로 초기화

    // 이렇게만 하면 아무 일도 안 일어남
    // topics[i].id는 잘 증가하며 숫자임
    // id state는 변동 없으며 문자임
    // -> id state는 setId에서 오고 이는 _id에서 왔으며 이건 Nav에 있다!
    // => event.target.id를 통해 id를 알아냈는데 이는 t.id에서 왔고 이건 문자열임
    //    (태그 속성으로 넘겼기 때문에 입력을 숫자로 해도 문자열이 됨!)
    let title, body = null;
    for (let i = 0; i < topics.length; i++){
      // topics[i].id와 id state를 비교하기 위한 콘솔 로그
      // console.log(topics[i].id, id);

      if (topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    // 주소를 클릭 시 뒤에 id가 추가로 붙으면 형식 상 알맞은 구현이 됨!
    
    // <> </> -> 복수의 태그를 그룹화하는 용도로 사용되는 빈 태그
    // (리액트에서는 태그를 다룰 시 하나의 태그 안에 들어있어야 하기 때문에 사용하는 것임)
    contextControl = <>
      <li><a href={'/update/' + id} onClick={
        event => {
          event.preventDefault();
          setMode('UPDATE');
        }
      }>Update</a></li>
      <li><input type="button" value="Delete" onClick={() => {
          // 빈 배열 생성
          const newTopics = []
          for (let i = 0; i < topics.length; i++) {
            // 삭제하려는 내용 id와 일치하지 않는 내용들만 push
            // 이렇게 하면 제거하려는 내용만 누락된 채로 복사본이 생성됨
            if (topics[i].id !== id) {
              newTopics.push(topics[i]);
            }
          }
          console.log(newTopics);
          // 복사한 배열로 데이터 새로 쓰기
          setTopics(newTopics);
          // 삭제했기 때문에 상세보기로 갈 수 없으므로 홈으로 가기
          setMode('WELCOME');
      }}></input></li>
    </>
  } else if (mode === 'CREATE'){
    // create mode가 복잡하므로 새로운 컴포넌트 생성!
    // content = <Create></Create>

    // submit 버튼 클릭 시 후속작업 수행하는 인터페이스 제공해보기
    // onCreate props에 함수 전달 시 사용자가 create를 누를 시 이 함수가 실행될 것이다고 고지하기
    // 해당 callback함수는 title과 body를 받을 수 있어야 함
    content = <Create onCreate={(_title, _body) => {
      // 사용자가 입력한 title과 body값을 Create 컴포넌트의 사용자에게 공급할 수 있다!
      // 이제 topics에 새로운 목록이 추가되어 나타나도록 해야 함!
      // 그러려면 topics 상태를 승격시켜주면 됨!
      // newTopic이라는 새로운 객체 생성('_'로 구분지어주기 ㅎㅎ)
      const newTopic = {id:nextId, title:_title, body:_body}
      
      // 이제 newTopic을 topics에 추가해야 하는데 어떻게 해야할까?
      // // 아래 문법은 읽을 때 사용하는 문법으로 오류!
      // topics.push(newTopic);
      // 그렇다면 setTopics를 사용해서 값을 넣을 수 있을까?
      // setTopics(topics); // 실행되지 않는다!
      // ================ 원리 이해하고 싶다면?? 아래 정리글 확인하기!
      // -> 상태 생성 시 데이터가 원시(PRIMITIVE)타입이면?
      // (7가지 : string, number, bigint, boolean, undefined, symbol, null)
      // => 예전 방식 그대로 진행
      // -> 범(Object) 객체라면?
      // (object: 객체, array: 배열)
      // => newValue = 객체인 경우 {...value}, 배열인 경우 [...value]형태로 작성(원본 value 복제)
      //    newValue(복제본)을 setValue()로 넣어 복제 value값을 변경한 뒤
      //    setValue(newValue)를 호출해야 비로소 컴포넌트다 재실행됨
      const newTopics = [...topics] // topics 복제본 newTopics 생성
      newTopics.push(newTopic); // newTopics에 newTopic 값을 push
      setTopics(newTopics); // 이래야 오리지널 topics와 복제본인 newTopics가 다르다고 판단됨!
      // 다른 값이 들어왔다고 판단되어서 컴포넌트가 새로 랜더링이 되는 것~

      // 값이 추가된 이후 바로 추가한 내용 상세페이지(body) 확인할 수 있도록 이동 주기
      // -> mode, id를 변경해주면 됨!
      setMode('READ');
      setId(nextId);
      // 다음 create 대비를 위해 nextId에 1을 더하기
      setNextId(nextId + 1);
    }}></Create>
  } else if (mode === 'UPDATE') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body}
                      onUpdate={(title, body) => {
                        console.log(title, body);
                        // 배열 복제는 [...value]
                        const newTopics = [...topics]
                        const updatedTopic = {id:id, title:title, body:body}
                        for (let i= 0; i < newTopics.length; i++) {
                          if (newTopics[i].id === id) {
                            newTopics[i] = updatedTopic;
                            break;
                          }
                        }

                        setTopics(newTopics);
                        setMode('READ');
              }}></Update>
  }

  // 화면 구성하는 코드(리턴값)
  return (
    <div className="App">
      {/* title 속성(props)에 REACT 값을 줘서 정의해보기! */}
      {/* <Header title="WEB" onChangeMode={function() { */}
      <Header title="WEB" onChangeMode={() => {
          // alert('Header');
          // mode = 'WELCOME';

          // setMode()로 값이 바뀔 경우 컴포넌트(App 함수)가 재실행됨
          // useState()가 mode의 값을 변경하고 content가 실행됨
          setMode('WELCOME');
        }
      }></Header>
      
      {/* <Nav topics="topics"></Nav> */}
      
      {/* 중괄호로 감싸면 문자열이 아닌 있는 그대로 전달됨 */}
      {/* <Nav topics={topics} onChangeMode={function(id) { */}
      {/* 이렇게 파라미터 주면 헷갈릴 수 있으니 _(언더바)를 추가 */}
      {/* <Nav topics={topics} onChangeMode={(id) => { */}
      <Nav topics={topics} onChangeMode={(_id) => {
        // alert(id);
        // mode = 'READ';  // READ로 바꿔도 App()는 다시 실행되지 않기 때문에 리턴 값이 변화 없음!
        setMode('READ');
        setId(_id);
        }
      }></Nav>
      
      {/* <Article title="Welcome" body="Hello, WEB"></Article> */}
      {/* 모드에 따라 컨텐트 변경! */}
      {content}<br />

      <ul>
        {/* 링크 클릭 시 새로운 내용 입력 UI 나타남 - 모드에 따라 create창 생성되도록!  */}
        {/* onClick을 하고 event를 파라미터로 줘서 a태그 기능 상실 주기 */}
        <li>
          <a href='/create' onClick={(event) => {
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a>
        </li>
        {/* 사용자가 홈으로 가면 Update가 없지만 상세 내용으로 가면 생김! */}
        {contextControl}
      </ul>
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

event 기능: 컴포넌트에 어떤 일이 발생 시
            사용자가 추가적인 어떤 작업을 처리할 수 있게 함
            (onClick event로 사용자가 버튼 클릭 시 경고창을 띄워줌)
            
props: 컴포넌트의 속성(ex, img 태그의 width나 src 같은 속성!)
  |
state: 컴포넌트 입력(props)과
출력(return) 사이에서 컴포넌트 함수를 다시 실행하여 새로운 리턴값을 만들어주는 state
-> 공통점: 값이 변경되면 새로운 리턴값을 만들어 UI를 바꿈
   차이점: props - 외부 사용자를 위한 데이터 / state - 내부 사용자를 위한 데이터

*/


// 원리
/*

const [value, setValue] = useState([1]);
-> 배열 형태의 객체
value.push(2);                     newValue = [...value]로 복제본 형성 후 여기에 push!
-> 오리지널 데이터를 바꾼 것(X)     -> 복제본에 데이터를 바꾼 것(O)
setValue(value);                   setValue(newValue);
-> 오리지널 데이터를 입력해준 것(X) -> 복제본 데이터를 입력해준 것(O)

* 리액트는 setValue를 할 때 오리지널과 새로 들어온 데이터가 같으면
굳이 컴포넌트를 다시 렌더링하지 않음!

const [value, setValue] = useState(1);
-> 원시 데이터 타입(number)의 객체
value.push(2);
-> 오리지널 데이터를 바꾼 것
setValue(value);
-> 오리지널 데이터를 입력해준 것(1과 2는 서로 다른 데이터이므로 컴포넌트 재 렌더링이 이뤄짐)

*/