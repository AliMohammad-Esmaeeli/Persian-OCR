export default function Footer() {
    return (
        <>
            <footer className="mt-auto flex flex-col justify-center items-center">
                <hr className="p-2 w-60 md:w-96" />
                <p className="text-xl text-center my-3">
                    <a
                        href="https://www.ali-mohammad.ir/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-800"
                    >
                        Ali Mohammad Esmaeeli
                    </a> {"  "}
                    | Copyright-© {new Date().getFullYear()}
                </p>
            </footer>
        </>
    )
}
