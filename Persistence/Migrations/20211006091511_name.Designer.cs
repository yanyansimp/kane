﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

namespace Persistence.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20211006091511_name")]
    partial class name
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("Domain.Activity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<string>("City");

                    b.Property<DateTime>("Date");

                    b.Property<string>("Description");

                    b.Property<string>("Title");

                    b.Property<string>("Venue");

                    b.HasKey("Id");

                    b.ToTable("Activities");
                });

            modelBuilder.Entity("Domain.Amenity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<Guid?>("PropertyTypeId");

                    b.HasKey("Id");

                    b.HasIndex("PropertyTypeId");

                    b.ToTable("Amenities");
                });

            modelBuilder.Entity("Domain.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("Address");

                    b.Property<string>("Bio");

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("DisplayName");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("MiddleName");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<string>("Suffix");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Domain.Business", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("ClientId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("DateEstablished");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("Industry");

                    b.Property<string>("Location");

                    b.Property<string>("Name");

                    b.Property<string>("Type");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("Businesses");
                });

            modelBuilder.Entity("Domain.Client", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<DateTime?>("AtBirthDate");

                    b.Property<string>("AtFirstName");

                    b.Property<string>("AtGender");

                    b.Property<string>("AtLastName");

                    b.Property<string>("AtMiddleName");

                    b.Property<string>("AtNumber");

                    b.Property<string>("AtSuffix");

                    b.Property<string>("AtTIN");

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("CivilStatus");

                    b.Property<DateTime?>("CoBirthDate");

                    b.Property<string>("CoFirstName");

                    b.Property<string>("CoGender");

                    b.Property<string>("CoLastName");

                    b.Property<string>("CoMiddleName");

                    b.Property<string>("CoNumber");

                    b.Property<string>("CoSuffix");

                    b.Property<string>("CoTIN");

                    b.Property<string>("CompanyLocation");

                    b.Property<string>("CompanyName");

                    b.Property<string>("ContactNumber");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<string>("DateEmployed");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("EducationalAttn");

                    b.Property<string>("Employment");

                    b.Property<string>("EmploymentType");

                    b.Property<string>("FirstName");

                    b.Property<string>("Gender");

                    b.Property<string>("HomeNumber");

                    b.Property<string>("Industry");

                    b.Property<string>("LastName");

                    b.Property<string>("MiddleName");

                    b.Property<string>("MonthlyHouseholdIncome");

                    b.Property<string>("MonthlyIncome");

                    b.Property<string>("Nationality");

                    b.Property<string>("NumberOfDependents");

                    b.Property<string>("OfficeNumber");

                    b.Property<string>("Position");

                    b.Property<string>("Profession");

                    b.Property<string>("Religion");

                    b.Property<string>("School");

                    b.Property<int?>("SequenceNo");

                    b.Property<DateTime?>("SpouseBirthDate");

                    b.Property<string>("SpouseFirstName");

                    b.Property<string>("SpouseGender");

                    b.Property<string>("SpouseLastName");

                    b.Property<string>("SpouseMiddleName");

                    b.Property<string>("SpouseNumber");

                    b.Property<string>("SpouseTIN");

                    b.Property<string>("Suffix");

                    b.Property<string>("TIN");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("ZipCode");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("Domain.Document", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("ClientId");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("Type");

                    b.Property<DateTime?>("UpdatedAt");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("ClientId");

                    b.ToTable("Documents");
                });

            modelBuilder.Entity("Domain.LandingPhoto", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("IsMain");

                    b.Property<string>("Name");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.ToTable("LandingPhotos");
                });

            modelBuilder.Entity("Domain.Payment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("Amount");

                    b.Property<string>("AppUserId");

                    b.Property<string>("BankName");

                    b.Property<string>("Branch");

                    b.Property<string>("CheckNo");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime>("DateOfPayment");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("InPaymentOf");

                    b.Property<string>("ModeOfPayment");

                    b.Property<string>("ORNumber");

                    b.Property<int?>("SequenceNo");

                    b.Property<Guid?>("TransactionId");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.HasIndex("TransactionId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("Domain.Photo", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AppUserId");

                    b.Property<bool>("IsMain");

                    b.Property<Guid?>("PropertyTypeId");

                    b.Property<string>("Url");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.HasIndex("PropertyTypeId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Domain.Property", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("Description");

                    b.Property<string>("ImageId");

                    b.Property<string>("Location");

                    b.Property<string>("Name");

                    b.Property<Guid?>("PropertyTypeId");

                    b.Property<string>("Status");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.HasIndex("PropertyTypeId");

                    b.ToTable("Properties");
                });

            modelBuilder.Entity("Domain.PropertyType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("Description");

                    b.Property<string>("ImageId");

                    b.Property<string>("Location");

                    b.Property<string>("Name");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.ToTable("PropertyTypes");
                });

            modelBuilder.Entity("Domain.Transaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AppUserId");

                    b.Property<Guid?>("ClientId");

                    b.Property<float>("ContractPrice");

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<float>("MonthlyAmortization");

                    b.Property<Guid?>("PropertyId");

                    b.Property<Guid>("SalesAgentId");

                    b.Property<Guid>("SalesManagerId");

                    b.Property<int>("SequenceNo");

                    b.Property<string>("Status");

                    b.Property<float>("Terms");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.HasIndex("ClientId");

                    b.HasIndex("PropertyId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("Domain.TransactionType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedAt");

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("Name");

                    b.Property<DateTime?>("UpdatedAt");

                    b.HasKey("Id");

                    b.ToTable("TransactionTypes");
                });

            modelBuilder.Entity("Domain.UserActivity", b =>
                {
                    b.Property<string>("AppUserId");

                    b.Property<Guid>("ActivityId");

                    b.Property<DateTime>("DateJoined");

                    b.Property<bool>("IsHost");

                    b.HasKey("AppUserId", "ActivityId");

                    b.HasIndex("ActivityId");

                    b.ToTable("UserActivities");
                });

            modelBuilder.Entity("Domain.Value", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Values");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Value 101"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Value 102"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Value 103"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Domain.Amenity", b =>
                {
                    b.HasOne("Domain.PropertyType")
                        .WithMany("Amenities")
                        .HasForeignKey("PropertyTypeId");
                });

            modelBuilder.Entity("Domain.Business", b =>
                {
                    b.HasOne("Domain.Client")
                        .WithMany("Businesses")
                        .HasForeignKey("ClientId");
                });

            modelBuilder.Entity("Domain.Document", b =>
                {
                    b.HasOne("Domain.Client")
                        .WithMany("Documents")
                        .HasForeignKey("ClientId");
                });

            modelBuilder.Entity("Domain.Payment", b =>
                {
                    b.HasOne("Domain.AppUser")
                        .WithMany("Payments")
                        .HasForeignKey("AppUserId");

                    b.HasOne("Domain.Transaction")
                        .WithMany("Payments")
                        .HasForeignKey("TransactionId");
                });

            modelBuilder.Entity("Domain.Photo", b =>
                {
                    b.HasOne("Domain.AppUser")
                        .WithMany("Photos")
                        .HasForeignKey("AppUserId");

                    b.HasOne("Domain.PropertyType")
                        .WithMany("Photos")
                        .HasForeignKey("PropertyTypeId");
                });

            modelBuilder.Entity("Domain.Property", b =>
                {
                    b.HasOne("Domain.Photo", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId");

                    b.HasOne("Domain.PropertyType")
                        .WithMany("Properties")
                        .HasForeignKey("PropertyTypeId");
                });

            modelBuilder.Entity("Domain.PropertyType", b =>
                {
                    b.HasOne("Domain.Photo", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId");
                });

            modelBuilder.Entity("Domain.Transaction", b =>
                {
                    b.HasOne("Domain.AppUser")
                        .WithMany("Transactions")
                        .HasForeignKey("AppUserId");

                    b.HasOne("Domain.Client")
                        .WithMany("Transactions")
                        .HasForeignKey("ClientId");

                    b.HasOne("Domain.Property", "Property")
                        .WithMany()
                        .HasForeignKey("PropertyId");
                });

            modelBuilder.Entity("Domain.UserActivity", b =>
                {
                    b.HasOne("Domain.Activity", "Activity")
                        .WithMany("UserActivities")
                        .HasForeignKey("ActivityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Domain.AppUser", "Appuser")
                        .WithMany("UserActivities")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Domain.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Domain.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Domain.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Domain.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
