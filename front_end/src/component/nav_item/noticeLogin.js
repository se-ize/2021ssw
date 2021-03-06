import React, { useState, useEffect } from "react";
import "../../css/noticeLogin.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Modal2 from "./noticeWrite"
import axios from "axios";

// let data, email, pw;
// let admin = data.admin;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginLeft: "15px",
    marginRight: "15px",
  },
  button: {
    color: "#81bef7",
  },
}));


const Modal = (props) => {
  const classes = useStyles();
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  const [modalState, setModalState] = useState({
    display: false,
    deleteItemId: undefined
  });

  //모달 내 입력 폼 관련 변수 정의
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [admin, setLogin] = useState([]);

  //모달 내 입력 폼 값 변경 시 초기화
  const handleChange = (event) => {
    setEmail(event.target.value);
    setPw(event.target.value);
    console.log(email + " / " + pw);
  };
  const [url, setUrl] = useState(`http://localhost:3001/admin/login`);

  useEffect(() => {
    /**
     * 비동기 통신 코드
     */
    const callDataApi = async () => {
      try {
        const resData = await axios.get(url);
        setLogin(resData.data);
      } catch (e) {
        console.log(e);
      }
    };
    callDataApi();
  }, []);

  function login(email, pw) {
    for (var i = 0; i < admin.length; i++) {
      if (email === admin[i].email && pw === admin[i].password) {
        console.log("로그인 성공");
        window.confirm("로그인 정보가 일치합니다.");
      }
    }
    console.log(email);
    window.confirm(email);
  }

  const useConfirm = (message = null, onConfirm) => {
    // if (!onConfirm || typeof onConfirm !== "function") {
    //   return;
    // }
    // if (onCancel && typeof onCancel !== "function") {
    //   return;
    // }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      }
    };

    return confirmAction;
  };

  const isSuccess = () => console.log("로그인 성공.");
  const isFail = () => console.log("로그인 실패.");

  const confirmDisplay = useConfirm(
    "로그인을 실패했습니다!",
    isSuccess,
    isFail
  );

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
          </header>
          <main>
            {props.children} {/* Main.js에 연결 */}
            <form className={classes.root}>
              <FormControl>
                <span>
                  <FormHelperText>
                    관리자만 공지사항을 쓸 수 있습니다. 관리자 로그인
                    팝업창입니다.
                  </FormHelperText>
                  <TextField
                    이메일
                    id={email}
                    name={email}
                    label="이메일"
                    onChange={handleChange}
                  />{" "}
                  <TextField
                    비밀번호
                    id={pw}
                    name={pw}
                    label="비밀번호"
                    type="password"
                    onChange={handleChange}
                  />
                </span>
              </FormControl>
            </form>
          </main>
          <footer>
            <button className="send" onClick={confirmDisplay}>    
              {" "}
              로그인{" "}
            </button>{" "}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
