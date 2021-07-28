import React from "react";

function Error({ error }) {
    return (
        <div>
            <div
                style={{
                    margin: "0 20%",
                }}
                className="alert alert-danger text-center"
                role="alert"
            >
                {error}
            </div>
        </div>
    );
}

export default Error;
