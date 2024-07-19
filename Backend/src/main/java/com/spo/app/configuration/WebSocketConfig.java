package com.spo.app.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Configuration du broker de messages pour les sujets de publication
        registry.enableSimpleBroker("/topic"); // Prefixe pour les sujets de publication
        registry.setApplicationDestinationPrefixes("/app"); // Prefixe pour les destinations d'application
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Point de terminaison pour les connexions WebSocket
        registry.addEndpoint("pages/ws").setAllowedOrigins("*").withSockJS();
    }
}
