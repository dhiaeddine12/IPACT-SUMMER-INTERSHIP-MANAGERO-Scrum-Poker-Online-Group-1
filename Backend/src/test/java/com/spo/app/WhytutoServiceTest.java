package com.spo.app;

import com.spo.app.dao.WhytutoRepository;
import com.spo.app.entity.WhyTuto;
import com.spo.app.services.WhytutoServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
public class WhytutoServiceTest
{
        @Mock
        private WhytutoRepository whytutoRepository;

        @InjectMocks
        private WhytutoServiceImpl whytutoService;

        @BeforeEach
        void setUp() {
            MockitoAnnotations.openMocks(this);
        }

        @Test
        void testRetrieveAllWhyTuto() {
            WhyTuto whyTuto1 = new WhyTuto(/* Initialize fields here */);
            WhyTuto whyTuto2 = new WhyTuto(/* Initialize fields here */);
            List<WhyTuto> expectedList = Arrays.asList(whyTuto1, whyTuto2);

            when(whytutoRepository.findAll()).thenReturn(expectedList);

            List<WhyTuto> actualList = whytutoService.retrieveAllWhyTuto();

            assertEquals(expectedList, actualList);
            verify(whytutoRepository, times(1)).findAll();
        }

        @Test
        void testAddWhyTuto() {
            WhyTuto whyTuto = new WhyTuto(/* Initialize fields here */);

            when(whytutoRepository.save(whyTuto)).thenReturn(whyTuto);

            WhyTuto addedWhyTuto = whytutoService.addWhyTuto(whyTuto);

            assertEquals(whyTuto, addedWhyTuto);
            verify(whytutoRepository, times(1)).save(whyTuto);
        }

        @Test
        void testUpdateWhyTuto() {
            WhyTuto whyTuto = new WhyTuto(/* Initialize fields here */);

            when(whytutoRepository.save(whyTuto)).thenReturn(whyTuto);

            WhyTuto updatedWhyTuto = whytutoService.updateWhyTuto(whyTuto);

            assertEquals(whyTuto, updatedWhyTuto);
            verify(whytutoRepository, times(1)).save(whyTuto);
        }

        @Test
        void testDeleteWhyTuto() {
            String id = "some-id";

            doNothing().when(whytutoRepository).deleteById(id);

            whytutoService.deleteWhyTuto(id);

            verify(whytutoRepository, times(1)).deleteById(id);
        }
}
