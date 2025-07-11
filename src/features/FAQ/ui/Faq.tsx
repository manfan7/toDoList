import { useState } from "react"
import styles from "./Faq.module.css"

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqData = [
    {
      question: "Кто такой Frontend-разработчик?",
      answer: "Специалист, который создает видимую часть веб-приложений с помощью HTML, CSS и JavaScript.",
    },
    {
      question: "Основные технологии в Frontend?",
      answer: "HTML5, CSS3, JavaScript (ES6+), React/Vue/Angular, Git, Webpack.",
    },
    {
      question: "Почему стоит выбрать React?",
      answer: "Компонентный подход, виртуальный DOM, большое сообщество и простота изучения.",
    },
  ]

  const toggleFAQ = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>FAQ для Frontend-разработчика</h1>

      {faqData.map((item, index) => (
        <div key={index} className={styles.item}>
          <button className={styles.question} onClick={() => toggleFAQ(index)}>
            {item.question}
            <span className={`${styles.arrow} ${openIndex === index ? styles.arrowOpen : ""}`}>▼</span>
          </button>

          {openIndex === index && <div className={styles.answer}>{item.answer}</div>}
        </div>
      ))}
    </div>
  )
}
