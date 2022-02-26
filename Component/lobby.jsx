import React from 'react';
import "./lobby.css"

function Player(param){
    return <img  className='PlayerIcon' src={param.pic}/>
}

function MakeCard(param){
    return(
        <div className='TermDiv'>
            <p className='term'>{param.term}</p>
            <div className="vl"></div>
            <p className='def'>{param.def}</p>
        </div>
    );
}
function Lobby(param){
    return(
        
        <React.Fragment>
            <h1>{param.number}</h1>
            <body>
            <h1>Welcome To study.io!</h1>
                <div id="MainBox">
                    <div id="PlayersBox"> 
                        <h1>Players</h1>
                        <div id="Players">
                            <Player pic="nyuhacks.png"/>
                            <Player pic="nyuhacks.png"/>
                            <Player pic="nyuhacks.png"/>
                            <Player pic="nyuhacks.png"/>
                            <Player pic="nyuhacks.png"/>
                            <Player pic="nyuhacks.png"/>
                            <Player pic="nyuhacks.png"/>
                            <Player pic="nyuhacks.png"/>
                        
                        </div>
                        

                    </div>
                    <div id='Timer'>

                    </div>
                    <div id="MakeLobbyAndCards">
                        <h1>Create your set</h1>
                        <div>
                            <MakeCard term="Binary Search" def="A searching algorithm"/>
                        </div>
                    </div>
                </div>
            </body>
                
        </React.Fragment>
    );


}


export default Lobby