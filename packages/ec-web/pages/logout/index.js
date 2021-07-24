import React, { useState } from "react";
import { useRouter } from "next/router";
import DismissingAlert from "../../components/DismissingAlert/DismissingAlert";
import { signIn, isSignIn } from "../../helpers/auth";
import nookies from 'nookies';

export async function getServerSideProps(ctx) {
    nookies.destroy(ctx, 'jwt')

    return { props: {} };
}

export default function Login() {
    
    return (
        <>
            Dang xuat thanh cong
        </>
    );
}
