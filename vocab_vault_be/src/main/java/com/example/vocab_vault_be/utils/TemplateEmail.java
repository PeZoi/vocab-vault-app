package com.example.vocab_vault_be.utils;

public class TemplateEmail {
    public static final String SUBJECT_REGISTER = "Vui kích hoạt tài khoản";
    public static final String EMAIL_TEMPLATE_REGISTER ="<div style=\"font-size: 16px; letter-spacing: normal;\">Chào" +
            " [[name]]," +
            "</div><div style=\"font-size: 16px; letter-spacing: normal;\"><i><br></i></div>" +
            "<div style=\"font-size: 16px; letter-spacing: normal;\">" +
            "</div>" +
            "<div style=\"font-size: 16px; letter-spacing: normal;\"><i><br></i></div>" +
            "<strong>[[VERIFY_CODE]]</strong><div style=\"font-size: 16px;" +
            " letter-spacing: normal;\"><span style=\"font-size: 18px;\"><span style=\"font-size: 24px;\">" +
            "<span style=\"font-weight: bolder;\"><font color=\"#ff0000\"></font></span></span>" +
            "</span></div><div style=\"font-size: 16px; letter-spacing: normal;\"><br></div>";
}
