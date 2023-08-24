
//set the url of the api related info and functions

export const exercisesOptions={
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

 export  const youtubeoptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':  process.env.REACT_APP_YOUTUBE_KEY,
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
  }



export const fetchData=async(url,options)=>{
   const response=await fetch(url,options);
   const data=await response.json();

   return data;
}