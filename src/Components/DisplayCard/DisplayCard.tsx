import styles from "./DisplayCard.module.css"

type DisplayProps = {
  ausdruck: string,
  definition: string
}

function DisplayCard({ausdruck, definition} : DisplayProps){
  return(
    <div className={styles["card-container"]}>
      <div className={styles["card-inner"]}>
        <div className={styles["card-front"]}>
          <h2>{ausdruck}</h2>
        </div>
        <div className={styles["card-back"]}>
          <h2>{definition}</h2>
        </div>
      </div>
    </div>
  );
}
export default DisplayCard