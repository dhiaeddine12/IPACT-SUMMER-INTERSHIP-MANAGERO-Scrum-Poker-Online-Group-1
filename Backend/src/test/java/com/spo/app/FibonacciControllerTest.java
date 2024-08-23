package com.spo.app;

import com.spo.app.controller.FibonacciController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

public class FibonacciControllerTest {

    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @InjectMocks
    private FibonacciController fibonacciController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testHandleClick() {
        int value = 42;

        fibonacciController.handleClick(value);

        verify(messagingTemplate, times(1)).convertAndSend("/topic/lastClicked", value);
    }

    @Test
    public void testHandleValidation() {
        int value = 123;

        fibonacciController.handleValidation(value);

        verify(messagingTemplate, times(1)).convertAndSend("/topic/validatedChoice", value);
    }

    @Test
    public void testSendIssueTitle() {
        String title = "Issue Title";

        fibonacciController.sendIssueTitle(title);

        verify(messagingTemplate, times(1)).convertAndSend("/topic/issueTitle", title);
    }

    @Test
    public void testStartVote() {
        fibonacciController.startVote();

        verify(messagingTemplate, times(1)).convertAndSend("/topic/voteStart", "Vote started");
    }
}
