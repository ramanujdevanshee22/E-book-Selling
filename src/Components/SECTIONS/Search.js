import GreenButton from "../UI/GreenButton";
import RedButton from "../UI/RedButton";
import '../CSS/searchSection.css'
import '../UI/CSS/textBox.css'
function Search(props) {
    return (
        <>
            <div className='search-section'>
                <input type="text" placeholder={props.placeholder} className='textBox'></input>
                <GreenButton buttonText="Search" />
                <RedButton buttonText="Cancel" />
            </div>
        </>
    )
}
export default Search;