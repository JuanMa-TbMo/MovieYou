import React from "react";
import { useEffect,useState } from "react";
import './App.css'
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=cb158bd6';


const App=()=>{

    const [movies,setMovies]= useState([]);
    const [searchTerm,setSearchTerm]= useState('');

const searchMovies = async (title) => {
    var pageNum=1;
    const response = await fetch(`${API_URL}&s=${title}`);
    const data= await response.json();
    setMovies(data.Search);

}

    useEffect(()=>{
        searchMovies('All');

    },[]);
    return(
        <div className="app">
                <h1>MovieYou</h1>

                <div className="search">
                    <input 
                        placeholder="Search for movies"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e)=>{
                            if (e.key === 'Enter'){
                                searchMovies(searchTerm);
                            }
                        }}
                     />

                     <img src={SearchIcon}
                     alt="search"
                    onClick={() => searchMovies(searchTerm)}
                  
                     />

                    
                </div>

        {movies?.length >0?
            ( 
                <div className="contaier">
                    {movies.map((movie)=> 
                    (
                        <MovieCard movie={movie} /> 
                     
                    ))}
                     <div className="reload"> <button> Reload</button> </div>
                </div>
            ):(
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
    
        </div>
    );
};

export  default App;