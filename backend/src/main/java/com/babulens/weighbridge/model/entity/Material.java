package com.babulens.weighbridge.model.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Material {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private int id;
	private String materialId;
	private String material;
	@ManyToOne
	private Profile profile;

	public Material() {
	}

	public Material(String materialId, String material, String profile) {
		this.materialId = materialId;
		this.material = material;
		this.profile = new Profile(profile);
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMaterialId() {
		return materialId;
	}

	public void setMaterialId(String materialId) {
		this.materialId = materialId;
	}

	public String getMaterial() {
		return material;
	}

	public void setMaterial(String material) {
		this.material = material;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Material)) {
			return false;
		}
		Material material = (Material) o;
		return getId() == material.getId();
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId());
	}

}
