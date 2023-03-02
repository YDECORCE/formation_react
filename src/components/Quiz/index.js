
import React, {Component}from 'react'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import { QuizMarvel } from '../QuizMarvel'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import QuizOver from '../QuizzOver'
import {FaChevronRight} from'react-icons/fa'

toast.configure();

class  Quiz extends Component {

  constructor(props) {
    super(props)

    this.initialState = {
      levelNames:["débutant","confirmé","expert"],
      quizLevel:0,
      maxQuestions:10,
      storedQuestions :[],
      question:null,
      options:[],
      idQuestion:0,
      btnDisabled:true,
      userAnswer:null,
      score:0,
      showWelcomeMsg:false,
      quizEnd:false,
      percent:0,
    }
  
    this.state = this.initialState;

    this.storedDataRef = React.createRef()
    
  }

 


  loadQuestions = (level) =>{
    console.log(level);
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level]
    if (fetchedArrayQuiz.length>=this.state.maxQuestions){

      this.storedDataRef.current=fetchedArrayQuiz
      const newArray = fetchedArrayQuiz.map(({answer, ...keepRest})=>keepRest)
      this.setState({
        storedQuestions:newArray
      })
    }else{
      console.log("Pas assez de questions")
    }

  }

  showToastMsg = pseudo =>{
    if(!this.state.showWelcomeMsg){

      this.setState({
        showWelcomeMsg:true
      })

      toast.warn(`Welcome ${pseudo} et bonne chance!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        bodyClassName:'toastify-color-welcome'
        });
    
    }
  
  }

  componentDidMount() { 
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]) 
  }

  componentDidUpdate(prevProps, prevState) { 
    if((this.state.storedQuestions !== prevState.storedQuestions)&&this.state.storedQuestions.length){
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options
      })
    }
    if((this.state.idQuestion !== prevState.idQuestion)&&this.state.storedQuestions.length){
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer:null,
        btnDisabled:true,
      })
    }

    if(this.props.userData.pseudo !== prevProps.userData.pseudo){
      this.showToastMsg(this.props.userData.pseudo)
    }

    if(this.state.quizEnd!==prevState.quizEnd){
      const gradePercent = this.getPercent(this.state.maxQuestions,this.state.score);
      this.gameOver(gradePercent)
    }
  } 

  submitAnswer = (selectedAnswer) =>{
      this.setState({
        userAnswer:selectedAnswer,
        btnDisabled:false,
      })
  }

  getPercent = (maxquest,score) =>(score/maxquest)*100; 

  gameOver =(percent)=>{

      if(percent>=50){
        this.setState({
          quizLevel:this.state.quizLevel+1,
          percent:percent,
          
        })
      }else{
        this.setState({
          percent:percent,
          
        })
      }

      
  }

  nextQuestion = ()=>{
    if(this.state.idQuestion===this.state.maxQuestions-1){
        //this.gameOver()
        this.setState({
          quizEnd:true
        })
    }else{
      this.setState((prevState)=>({
          idQuestion:prevState.idQuestion + 1
      }))
    }
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

    if(this.state.userAnswer===goodAnswer){

      this.setState(prevState =>({
        score:prevState.score+1
      }))

      toast.success(`Bravo +1`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        bodyClassName:'toastify-color',
        });
    }else{
      toast.error('Raté...', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName:'toastify-color',
        });
    }
  }

  loadLevelQuestions = (param)=>{
      this.setState({...this.initialState, quizLevel:param})
      this.loadQuestions(this.state.levelNames[param]);
  }

  render(){

  
    const displayOptions= this.state.options.map((option, index)=>{
        return <p key={index} 
                  onClick={()=>this.submitAnswer(option)}
                  className={`answerOptions ${this.state.userAnswer===option?'selected':''}`}
                  > <FaChevronRight/> {option}</p>
    })

    return  this.state.quizEnd ? (
                <QuizOver 
                  ref={this.storedDataRef}
                  levelNames={this.state.levelNames}
                  score={this.state.score}
                  maxQuestions={this.state.maxQuestions}
                  quizLevel={this.state.quizLevel}
                  percent={this.state.percent}
                  loadLevelQuestions={this.loadLevelQuestions}/>
                ):
   (
      <>
       
        <Levels levelNames={this.state.levelNames} quizLevel={this.state.quizLevel}/>
        <ProgressBar 
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}
        />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button 
          disabled={this.state.btnDisabled} 
          className='btnSubmit'
          onClick={this.nextQuestion}
          >
            {this.state.idQuestion<this.state.maxQuestions-1?"Suivant":"Terminer"}
          </button>
      </>
    )
  }
  
}

export default Quiz