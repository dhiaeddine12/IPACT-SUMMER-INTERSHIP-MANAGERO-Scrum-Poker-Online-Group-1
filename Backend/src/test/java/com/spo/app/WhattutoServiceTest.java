package com.spo.app;

import com.spo.app.dao.WhattutoRepository;
import com.spo.app.entity.WhatTuto;
import com.spo.app.services.WhattutoServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class WhattutoServiceTest {

    @Mock
    private WhattutoRepository whattutoRepository;

    @InjectMocks
    private WhattutoServiceImpl whattutoServiceImpl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRetrieveAllWhatTuto() {
        // Arrange
        WhatTuto whatTuto1 = new WhatTuto();
        WhatTuto whatTuto2 = new WhatTuto();
        List<WhatTuto> whatTutos = Arrays.asList(whatTuto1, whatTuto2);

        when(whattutoRepository.findAll()).thenReturn(whatTutos);

        // Act
        List<WhatTuto> result = whattutoServiceImpl.retrieveAllWhatTuto();

        // Assert
        assertEquals(2, result.size());
        verify(whattutoRepository, times(1)).findAll();
    }

    @Test
    void testAddWhatTuto() {
        // Arrange
        WhatTuto whatTuto = new WhatTuto();

        when(whattutoRepository.save(whatTuto)).thenReturn(whatTuto);

        // Act
        WhatTuto result = whattutoServiceImpl.addWhatTuto(whatTuto);

        // Assert
        assertEquals(whatTuto, result);
        verify(whattutoRepository, times(1)).save(whatTuto);
    }

    @Test
    void testUpdateWhatTuto() {
        // Arrange
        WhatTuto whatTuto = new WhatTuto();

        when(whattutoRepository.save(whatTuto)).thenReturn(whatTuto);

        // Act
        WhatTuto result = whattutoServiceImpl.updateWhatTuto(whatTuto);

        // Assert
        assertEquals(whatTuto, result);
        verify(whattutoRepository, times(1)).save(whatTuto);
    }
}

