import React from "react";

function Success({ success }) {
    return (
        <div>
            <div
                style={{
                    margin: "10px 20%",
                }}
                className="alert alert-success text-center"
                role="alert"
            >
                {success}
            </div>
        </div>
    );
}

export default Success;
