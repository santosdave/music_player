import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
function Nav({ setLibraryStatus, libraryStatus }) {
    const openLibraryHandler = () => {
        setLibraryStatus(!libraryStatus);
      };
    return (
        <nav className="container h-24 min-h-full flex justify-around items-center">
            <h1>Waves</h1>
                    <Button
                        color="white"
                        buttonType="outline"
                        rounded={true}
                        onClick={openLibraryHandler}
                        ripple={"dark"}
                        className={`md:inline-flex h-15 w-22 md:z-10 border-0 hover:bg-gray-300 ${libraryStatus ? "library-active" : ""}`}
                    >
                    Library
                     <Icon name="music_note" size="3xl" color="gray"/>
                    </Button>
        </nav>
    )
}

export default Nav
