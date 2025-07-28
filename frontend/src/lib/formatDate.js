const formatDate= (date)=>{
    return date.toLocaleDateString("en-us",{
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
export default formatDate;