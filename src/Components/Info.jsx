import { motion } from "framer-motion";
import useStore from "../stores/useStore"; // Zustand store
import { FaGithub } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { Button } from "react-bootstrap";

export default function Info() {
  const clearActiveButton = useStore((state) => state.clearActiveButton);

  const handleYesClick = () => {
    window.open("https://1dire.github.io/Main/", "_blank");
  };

  const handleNoClick = () => {
    clearActiveButton();
  };

  // 애니메이션 설정
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="info"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="contents">
        <div className="profile-img">
          <img
            src="https://avatars.githubusercontent.com/u/131497420?v=4"
            alt="github img"
          />
        </div>
        <div className="text">
          <h2>Dire</h2>
          <h3 className="name">Sangwoo Lee</h3>
        </div>
        <div className="button-div mb-2">
          <div className="github">
            <a
              href="https://github.com/1Dire"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button style={{ border: "none", background: "transparent" }}>
                <FaGithub size={32} color="black" />
              </button>
            </a>
          </div>
          <div className="e-mail">
            <a
              href="mailto:dkdkdltkddn@naver.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button style={{ border: "none", background: "transparent" }}>
                <HiMail size={32} color="black" />
              </button>
            </a>
          </div>
        </div>
        <div className="traces">
          <div className="text mb-2">Would you like to see my study traces?</div>
          <Button
            className="w-100 mb-2"
            variant="primary"
            onClick={handleYesClick}
          >
            Yes
          </Button>
          <Button
            className="w-100"
            variant="secondary"
            onClick={handleNoClick}
          >
            No thanks, Just let it go
          </Button>
        </div>
      </div>
      <div className="tip">
        <div className="tip-text">
          <div></div>
        </div>
      </div>
    </motion.div>
  );
}
