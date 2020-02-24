package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Material;
import com.babulens.weighbridge.repository.MaterialDAO;
import com.babulens.weighbridge.service.MaterialService;
import com.google.common.collect.Lists;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

	private final
	MaterialDAO materialDAO;

	public MaterialServiceImpl(MaterialDAO materialDAO) {
		this.materialDAO = materialDAO;
	}

	@Override
	@Cacheable(cacheNames = "Materials")
	public List<Material> getAllMaterialsByProfile(String profile) {
		return Lists.newArrayList(materialDAO.findAllByProfile(profile));
	}

	@Override
	@CacheEvict(value = "Materials", allEntries = true)
	public Material addUpdateMaterial(Material material) {
		return materialDAO.save(material);
	}

	@Override
	@CacheEvict(value = "Materials", allEntries = true)
	public void deleteMaterial(int id) {
		materialDAO.deleteById(id);
	}

}
