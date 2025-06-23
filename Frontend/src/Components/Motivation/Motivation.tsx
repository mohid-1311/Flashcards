import styles from "./Motivation.module.css"

function Motivation() {

  const motivationsQuotes = [
    "„Alles was du willst, ist auf der anderen Seite der Angst.” – George Addair",
    "„Ob du denkst, du kannst es, oder du kannst es nicht – du wirst auf jeden Fall Recht behalten.” – Henry Ford",
    "„Positiv zu bleiben bedeutet nicht, dass die Dinge immer funktionieren werden. Vielmehr ist es das Wissen, dass es dir gut gehen wird, egal wie es ausgeht.” – Garth Ennis",
    "„Manchmal bringt dich der Sturz um. Und manchmal fliegt man.” – Neil Gaiman",
    "„Wenn etwas nicht stimmt, verbessere es jetzt. Aber gewöhne dir an, dir keine Sorgen zu machen, denn Sorgen lösen nichts.” – Ernest Hemingway",
    "„Ich bereue lieber die Dinge, die ich getan habe, als die Dinge, die ich nicht getan habe.” – Lucille Ball",
    "„Ich habe immer geglaubt, und ich glaube immer noch, dass wir dem Ganzen, was auch immer auf uns zukommt, immer einen Sinn geben und es in etwas von Wert verwandeln können.“ – Hermann Hesse",
    "„Um Kritik zu vermeiden: Tu nichts, sag nichts, sei nichts.” – Elbert Hubbard",
    "„In zwanzig Jahren wirst du mehr enttäuscht sein von den Dingen, die du nicht getan hast, als von den Dingen, die du getan hast.” – Mark Twain",    
    "„Die Not bereitet gewöhnliche Menschen oft auf ein außergewöhnliches Schicksal vor.” – C. S. Lewis",
    "„Der beste Ausweg ist immer mitten durch.” – Robert Frost",
    "„Es geht nicht darum, ob man niedergeschlagen wird. Es geht darum, ob man wieder aufsteht.” – Vince Lombardi",
    "„Wenn du glaubst, dass es funktionieren wird, wirst du Chancen sehen. Wenn du glaubst, dass es das nicht wird, wirst du Hindernisse sehen.” – Wayne Dyer",
    "„Wünsche nicht, dass es einfacher wäre. Wünsche, dass du besser wärst.” – Jim Rohn",
    "„Die meisten wichtigen Dinge in der Welt wurden von Menschen vollbracht, die es immer wieder versucht haben, auch wenn es keine Hoffnung mehr zu geben schien.” – Dale Carnegie",
    "„Ich schreibe meinen Erfolg Folgendem zu: Ich habe nie nach Ausreden gesucht und auch nie Ausreden aufgeführt.” – Florence Nightingale",
    "„Schwierige Zeiten schaffen keine Helden, in schwierigen Zeiten wird der ‚Held‘ in uns offenbart.” – Bob Riley",
    "„Wahrer Charakter wird nicht in Zeiten der Unbekümmertheit und Gelassenheit entwickelt. Nur durch Bewährungsprobe und Schmerz kann die Seele gestärkt, Ehrgeiz angeregt und Erfolg erzielt werden.” – Helen Keller",
    "„Wir müssen glauben, dass wir für etwas berufen sind und wir dieses Ziel auch erreichen werden.” – Marie Curie",
    "„Wenn du das Ziel jedes Mal triffst, ist es zu nah oder zu groß.” – Tom Hirshfield",
    "„Ich bin kein Produkt meiner Umstände. Ich bin ein Produkt meiner Entscheidungen.” – Stephen Covey",
    "„Versagen ist die Zutat, die dem Erfolg erst seinen Geschmack verleiht.” – Truman Capote",
    "„Indem wir in den Abgrund hinabsteigen, retten wir die Schätze des Lebens. Dort wo du stolperst, da liegt dein Schatz.” – Joseph Campbell",
    "„Sei unbestreitbar.” – Ralphie May",
    "„Es ist nie zu spät, das zu sein, was du hättest sein können.” – George Eliot",
    "„Sobald du deine Fehler akzeptiert hast, kann sie niemand mehr gegen dich verwenden.” – George R. R. Martin",
    "„Sei stärker als deine Gefühle. Ich verlange das nicht von dir – das tut das Leben. Sonst wirst du von Gefühlen weggespült, auf die See geschwemmt und nie wieder gesehen.” – Philip Roth",
    "„Das Leben besteht zu 10 % aus dem, was dir passiert und zu 90 % aus dem, wie du darauf reagierst.” – Charles R. Swindoll",
    "„Wenn du ein Licht für jemand anderen anzündest, wird es auch deinen Weg erhellen.” – Buddha",
    "„Perfektionismus ist die Stimme des Unterdrückers, des Feindes des Menschen. Er wird dich dein ganzes Leben lang verkrampft und wahnsinnig machen, und er ist das größte Hindernis zwischen dir und einem beschissenen ersten Konzept. Ich denke, Perfektionismus basiert auf dem obsessiven Glauben, dass man nicht sterben muss, wenn man vorsichtig genug ist, wenn man jedes Sprungbrett genau trifft. Die Wahrheit ist, dass du sowieso sterben wirst und dass viele Leute, die nicht einmal auf ihre Füße schauen, es viel besser machen als du und viel mehr Spaß haben, während sie es tun.” – Anne Lamott",
    "„Unsere Tugenden und unsere Fehler sind untrennbar miteinander verbunden, wie Kraft und Materie. Wenn sie sich trennen, ist der Mensch nicht mehr da.” – Nikola Tesla",
  ]

  let randomQuote: string = motivationsQuotes[Math.floor(Math.random() * motivationsQuotes.length)]
  let dashIndex: number = randomQuote.lastIndexOf("–")

  let fontsize = 5
  if (randomQuote.length > 80) fontsize += -1
  if (randomQuote.length > 400) fontsize += -1
  if (randomQuote.length > 500) fontsize += -1
  if (document.documentElement.clientWidth < 1000) fontsize += -1
  if (document.documentElement.clientWidth < 800) fontsize += 1

  return (
    <div className={styles[`motivation-${fontsize}`]}>
      {randomQuote.substring(0, dashIndex)}
      <br />
      {randomQuote.substring(dashIndex, randomQuote.length)}
    </div>
  )
}
export default Motivation