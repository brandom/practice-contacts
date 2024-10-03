import { Injectable, signal, computed } from '@angular/core';

export interface Practice {
  id: number;
  name: string;
  region: string;
  address: string;
  hoursOfOperation: string;
}

export interface Leader {
  id: number;
  name: string;
  title: string;
}

export interface Provider {
  id: number;
  provider: string;
  specialty: string;
  providerCell: string;
  primaryNurse: string;
  primaryNurseNumber: string;
  primaryMA: string;
  primaryMANumber: string;
  notes: string;
  sourceSheet: string;
  surgeryScheduler: string;
  surgerySchedulerNumber: string;
  secondNurse: string;
  secondNurseNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private practices = signal<Practice[]>([
    { id: 1, name: 'City Central Clinic', region: 'Downtown', address: '123 Main St, Cityville', hoursOfOperation: 'Mon-Fri: 9AM-5PM' },
    { id: 2, name: 'Suburban Health Center', region: 'Suburbs', address: '456 Oak Rd, Townsville', hoursOfOperation: 'Mon-Sat: 8AM-8PM' },
    { id: 3, name: 'Rural Medical Practice', region: 'Countryside', address: '789 Farm Lane, Villageton', hoursOfOperation: 'Mon-Fri: 8AM-4PM' },
  ]);

  private leaders = signal<Leader[]>([
    { id: 1, name: 'John Doe', title: 'CEO' },
    { id: 2, name: 'Jane Smith', title: 'CMO' },
  ]);

  private providers = signal<Provider[]>([
    { id: 1, provider: 'Dr. Alice Johnson', specialty: 'Cardiology', providerCell: '555-0101', primaryNurse: 'Nancy White', primaryNurseNumber: '555-0201', primaryMA: 'Mark Brown', primaryMANumber: '555-0301', notes: 'Specializes in interventional cardiology', sourceSheet: 'Sheet A', surgeryScheduler: 'Sarah Green', surgerySchedulerNumber: '555-0401', secondNurse: 'Emily Davis', secondNurseNumber: '555-0501' },
    { id: 2, provider: 'Dr. Bob Williams', specialty: 'Orthopedics', providerCell: '555-0102', primaryNurse: 'Oliver Taylor', primaryNurseNumber: '555-0202', primaryMA: 'Sophia Lee', primaryMANumber: '555-0302', notes: 'Focuses on sports medicine', sourceSheet: 'Sheet B', surgeryScheduler: 'Emma Wilson', surgerySchedulerNumber: '555-0402', secondNurse: 'Liam Moore', secondNurseNumber: '555-0502' },
  ]);

  getPractices = computed(() => this.practices());

  getPractice(id: number) {
    return computed(() => this.practices().find(practice => practice.id === id))();
  }

  updatePractice(updatedPractice: Practice) {
    this.practices.update(practices => 
      practices.map(practice => practice.id === updatedPractice.id ? updatedPractice : practice)
    );
  }

  getLeaders = computed(() => this.leaders());

  updateLeader(updatedLeader: Leader) {
    this.leaders.update(leaders => 
      leaders.map(leader => leader.id === updatedLeader.id ? updatedLeader : leader)
    );
  }

  getProviders = computed(() => this.providers());

  updateProvider(updatedProvider: Provider) {
    this.providers.update(providers => 
      providers.map(provider => provider.id === updatedProvider.id ? updatedProvider : provider)
    );
  }
}