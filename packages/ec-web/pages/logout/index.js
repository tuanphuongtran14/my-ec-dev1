import React, { useState } from "react";
import { useRouter } from "next/router";
import DismissingAlert from "../../components/DismissingAlert/DismissingAlert";
import { signIn, isSignIn } from "../../helpers/auth";

export async function getServerSideProps(ctx) {

    return { props: {} };
}

export default function Login() {
    
    return (
        <>
            Dang xuat thanh cong
        </>
    );
}
