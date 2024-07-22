package com.spo.app.services;

import com.spo.app.dao.WhattutoRepository;
import com.spo.app.entity.WhatTuto;
import com.spo.app.entity.WhyTuto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class WhattutoServiceImpl implements IWhattutoService{

    private WhattutoRepository whattutoRepository;


    @Override
    public List<WhatTuto> retrieveAllWhatTuto() {
        return whattutoRepository.findAll();
    }

    @Override
    public WhatTuto addWhatTuto(WhatTuto whatTuto) {
        return whattutoRepository.save(whatTuto);
    }

    @Override
    public WhatTuto updateWhatTuto(WhatTuto whatTuto) {
        return whattutoRepository.save(whatTuto);
    }
}
