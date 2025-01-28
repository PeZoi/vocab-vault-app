package com.example.vocab_vault_be.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProxyService {
    private final String cookieQuizlet = "__cf_bm=rWWm3r7HO8cvItF4fo_QwWT2v8_BwqTTmIaeuck82NM-1737548392-1.0.1.1-3XobAsY_ijDZCQLXUDyDOHm0F.8uWT.uJmhGwTmtWkni6WnMN0GsJ.LvXup_v8SXxP7yczujUjoE_IAuEfBEgg; _cfuvid=tHTKYtrQAHvf8VqLC0Gfei1ukb_ivYdBxAffhGNccSk-1737548392316-0.0.1.1-604800000; _pxhd=ef0f77925e8d38ef08c85e693a83ca3df9fc5620c5e575ad1dc37d57fd14f58e:2e5e6acf-d8bb-11ef-9403-8e87c1de5737; app_session_id=012013d9-1cf9-455c-b097-eff5063c62e5; fs=sqhox4; qi5=1nxecbpezqhpt%3AVJUabTe9wH0RTWjMCnCr; qtkn=YdtJGENAMrakdXxkqHAT3D";
    private final String clientIdQuizlet = "-855855793112888788";
    @Value("${gemini.api-key}")
    private String geminiApiKey;

    public JsonNode fetchSuggestionsEn(String prefix) {
        return WebClient.builder()
                .baseUrl("https://quizlet.com")
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/webapi/3.2/suggestions/word")
                        .queryParam("clientId", clientIdQuizlet)
                        .queryParam("limit", 3)
                        .queryParam("defLang", "vi")
                        .queryParam("localTermId", -1)
                        .queryParam("prefix", prefix)
                        .queryParam("wordLang", "en")
                        .build())
                .header("Cookie", cookieQuizlet)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
    }

    public JsonNode fetchSuggestionsVi(String word, String prefix) {
        return WebClient.builder()
                .baseUrl("https://quizlet.com")
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/webapi/3.2/suggestions/definition")
                        .queryParam("clientId", clientIdQuizlet)
                        .queryParam("limit", 3)
                        .queryParam("word", word)
                        .queryParam("wordLang", "en")
                        .queryParam("defLang", "vi")
                        .queryParam("localTermId", -1)
                        .queryParam("prefix", prefix)
                        .build())
                .header("Cookie", cookieQuizlet)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
    }

    public JsonNode generateWord(String word) {
        return WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com")
                .build()
                .post()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1beta/models/gemini-1.5-flash:generateContent")
                        .queryParam("key", geminiApiKey)
                        .build())
                .header("Content-Type", "application/json")
                .bodyValue(
                        Map.of(
                                "generationConfig", new HashMap<>(),
                                "safetySettings", new ArrayList<>(),
                                "contents", List.of(
                                        Map.of(
                                                "role", "user",
                                                "parts", List.of(
                                                        Map.of(
                                                                "text", String.format(
                                                                        "Bạn là một chuyên gia ngôn ngữ có khả năng tạo flashcard chất lượng cao. " +
                                                                                "Hãy tạo flashcard cho từ \"%s\" với ngôn ngữ english.\n\n" +
                                                                                "Yêu cầu:\n" +
                                                                                "1. Phải cung cấp thông tin chính xác và đầy đủ\n" +
                                                                                "2. Ví dụ phải thực tế và dễ hiểu\n" +
                                                                                "3. Ghi chú phải hữu ích cho việc ghi nhớ\n" +
                                                                                "4. Định dạng JSON phải chính xác\n\n" +
                                                                                "5. origin phải là tiếng anh, từ " +
                                                                                "muốn dịch\n\n" +
                                                                                "6. define phải là tiếng việt, từ " +
                                                                                "định nghĩa ngắn gọn dễ hiểu\n\n" +
                                                                                "Trả về kết quả theo cấu trúc JSON sau và KHÔNG kèm theo bất kỳ giải thích nào:\n" +
                                                                                "{\n" +
                                                                                "   \"origin\": \"\",\n // Từ muốn " +
                                                                                "dịch nghĩa" +
                                                                                "   \"define\": \"\",\n // Định nghĩa bằng tiếng Việt, ngắn gọn và dễ hiểu" +
                                                                                "   \"partsOfSpeech\": \"\",\n // Loại " +
                                                                                "từ (Nound, Adj, Adv, Verb, Phrasal verb, Idioms etc.)" +
                                                                                "   \"ipa\": \"\",\n // Phiên âm " +
                                                                                "chuẩn IPA" +
                                                                                "   \"level\": \"\",\n // Từ này thuộc cấp mấy (A1, A2, ... C1, C2)" +
                                                                                "   \"examples\": [\n" +
                                                                                "       {\"en\": \"\", \"vi\": \"\"},\n" +
                                                                                "       {\"en\": \"\", \"vi\": \"\"},\n" +
                                                                                "   ],\n // Ví dụ cho tôi 2 đơn giản " +
                                                                                "nhất có thể" +
                                                                                "   \"note\": \"\"\n // ghi chú bằng " +
                                                                                "tiếng việt giúp tôi" +
                                                                                "}", word
                                                                )
                                                        )
                                                )
                                        )
                                )
                        )
                )
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
    }

    public byte[] getSoundForWord(String word) {
        return WebClient.builder()
                .baseUrl("https://dict.youdao.com")
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/dictvoice")
                        .queryParam("audio", word)
                        .queryParam("type", 2)
                        .build())
                .retrieve()
                .bodyToMono(byte[].class)
                .block();
    }
}
