module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
      return `${date.getMonth()+ 1}/${date.getDate()}/${date.getFullYear()
      }`;
    },
    format_breed: (breed) =>{
      return ((breed.split(" ")).map((word)=>{
        return word.charAt(0).toUpperCase() +word.slice(1)
      })).join(" ");
    }
  };
  