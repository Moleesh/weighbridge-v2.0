package com.babulens.weighbridge.serviceImpl;

import com.babulens.weighbridge.model.entity.Material;
import com.babulens.weighbridge.model.entity.Profile;
import com.babulens.weighbridge.repository.MaterialDAO;
import com.babulens.weighbridge.service.MaterialService;
import com.google.common.collect.Lists;
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
	public List<Material> getAllMaterialByProfile(String profile) {
		return Lists.newArrayList(materialDAO.findAllByProfile(new Profile(profile)));
	}

	@Override
	public Material addUpdateMaterial(Material material) {
		return materialDAO.save(material);
	}

	@Override
	public void deleteMaterial(int id) {
		materialDAO.deleteById(id);
	}
}
