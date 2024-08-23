package com.spo.app.services;

import com.spo.app.dao.WhytutoRepository;
import com.spo.app.entity.WhyTuto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class WhytutoServiceImpl implements  IWhytutoService{

private WhytutoRepository whytutoRepository;


    @Override
    public List<WhyTuto> retrieveAllWhyTuto() {
        return whytutoRepository.findAll();
    }

    @Override
    public WhyTuto addWhyTuto(WhyTuto whyTuto) {
        return whytutoRepository.save(whyTuto);
    }

    @Override
    public WhyTuto updateWhyTuto(WhyTuto whyTuto) {
        return whytutoRepository.save(whyTuto);
    }

    @Override
    public void deleteWhyTuto(String id) {
        whytutoRepository.deleteById(id);
    }


}
