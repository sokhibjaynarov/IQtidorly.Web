import React, { useState, useRef } from "react";
import "./addtest.scss";
import { FiPlus } from "react-icons/fi";
import { useGetInputValuen } from "../../../../../hooks/useGetInputValue";
import Quill from "quill";
import Editor from "./Editor";
import "quill/dist/quill.snow.css";
import informatin from "../../../../../assets/images/information-circle.png";

const Delta = Quill.import("delta");

const Addtest = () => {
  const [choices, setChoices] = useState([
    { id: 1, text: "Variant 1", isSelected: false },
    { id: 2, text: "Variant 2", isSelected: false },
    { id: 3, text: "Variant 3", isSelected: false },
    { id: 4, text: "Variant 4", isSelected: false },
  ]);

  const addChoice = () => {
    const newChoice = {
      id: Date.now(),
      text: "",
      isSelected: false,
    };
    setChoices([...choices, newChoice]);
  };

  const deleteChoice = (id) => {
    setChoices(choices.filter((choice) => choice.id !== id));
  };

  const updateChoiceText = (id, newText) => {
    setChoices(
      choices.map((choice) =>
        choice.id === id ? { ...choice, text: newText } : choice
      )
    );
  };
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);

  const quillRef = useRef();

  const { formData, handlechange, setFormData } = useGetInputValuen({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
  });

  const handleAddQuestion = () => {
    setFormData({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
    });
  };

  const [subject, setSubject] = useState("Matematika");
  const [grade, setGrade] = useState("Matematika");
  const [questionType, setQuestionType] = useState("Yagona tanlov");
  const [points, setPoints] = useState(1);

  const handleSave = () => {
    alert(
      `Ma'lumotlar saqlandi: \nFan: ${subject} \nSinfi: ${grade} \nSavol turi: ${questionType} \nBall: ${points}`
    );
  };

  const handleCancel = () => {
    setSubject("Matematika");
    setGrade("Matematika");
    setQuestionType("Yagona tanlov");
    setPoints(1);
  };

  const isDisabled =
    !formData.question ||
    !formData.optionA ||
    !formData.optionB ||
    !formData.optionC ||
    !formData.optionD;

  return (
    <div id="add">
      <div className="add">
        <div className="add__left">
          <div className="add__title">
            <h2>Savollar</h2>
            <p>Jami savollar: 3</p>
          </div>
          <h3>1. Savol</h3>
          <div className="question-container">
            <input
              type="text"
              placeholder="Bu yerga savol yozing"
              name="question"
              className="question-input"
            />
            <div className="options-container">
              <input
                type="text"
                placeholder="A"
                name="optionA"
                className="option-input"
              />
              <input
                type="text"
                placeholder="B"
                name="optionB"
                className="option-input"
              />
              <input
                type="text"
                placeholder="C"
                name="optionC"
                className="option-input"
              />
              <input
                type="text"
                placeholder="D"
                name="optionD"
                className="option-input"
              />
            </div>
          </div>
          <button
            style={{
              backgroundColor: isDisabled
                ? "rgba(0, 167, 111, 0.6)"
                : "#007a54",
              color: "#fff",
            }}
          >
            <FiPlus /> Yangi savol qo’shish
          </button>
        </div>
        <div className="add__right">
          <div className="add__right__title">
            <h2>1.Savol</h2>
            <div>
              <button className="add__right__delete">Bekor qilish</button>
              <button className="add__right__save">Saqlash</button>
            </div>
          </div>
          <div className="add__right__select">
            <div style={{ marginBottom: "15px" }}>
              <label>Fanni tanlang</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="Matematika">Matematika</option>
                <option value="Fizika">Fizika</option>
                <option value="Kimyo">Kimyo</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Sinfni tanlang</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value="Matematika">Matematika</option>
                <option value="9-sinf">9-sinf</option>
                <option value="10-sinf">10-sinf</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Savol turi</label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <option value="Yagona tanlov">Yagona tanlov</option>
                <option value="Ko'p tanlovli">Ko'p tanlovli</option>
                <option value="Matnli javob">Matnli javob</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label>Har bir savol uchun beriladigan ball</label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                // style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>
          </div>
          <div className="add__right__matter">
            <div>
              <Editor
                ref={quillRef}
                readOnly={readOnly}
                onSelectionChange={setRange}
                onTextChange={setLastChange}
              />
            </div>
          </div>
          <div className="add__right__checkbox">
            <div className="add__right__checkbox__title">
              <img src={informatin} alt="" />
              <h2>
                Variantlaringizni qo'shing va to'g'ri javob(lar)ni belgilang.
              </h2>
            </div>
            <div>
              <div className="multiple-choice">
                <h3 className="multiple-choice__title">Javob variantlari</h3>
                <div className="multiple-choice__list">
                  {choices.map((choice) => (
                    <div key={choice.id} className="multiple-choice__item">
                      <div>
                        <input
                          type="radio"
                          name="answer"
                          checked={choice.isSelected}
                          onChange={() =>
                            setChoices(
                              choices.map((c) =>
                                c.id === choice.id
                                  ? { ...c, isSelected: true }
                                  : { ...c, isSelected: false }
                              )
                            )
                          }
                          className="multiple-choice__radio"
                        />
                        <input
                          type="text"
                          value={choice.text}
                          onChange={(e) =>
                            updateChoiceText(choice.id, e.target.value)
                          }
                          placeholder="Javob matnini kiriting"
                          className="multiple-choice__input"
                        />
                      </div>
                      <button
                        onClick={() => deleteChoice(choice.id)}
                        className="multiple-choice__delete"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={addChoice} className="multiple-choice__add">
                  <span>+</span> Javobni qo'shish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addtest;
